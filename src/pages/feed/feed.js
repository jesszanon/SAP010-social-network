import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { logout } from '../../lib';
import {
  pegarPost,
  criarPost,
  likePost,
  deletarPost,
  editarPost,
} from '../../lib/firestore';

export default () => {
  const container = document.createElement('div');

  const template = `

    <header class='header-feed'>
      <img src='imagens/logo branca feed.png' class='logo-feed'> 
      <button class='btnSair' id='btn_Sair' type='button'>Sair</button> 
      <h4>  Olá, ${auth.currentUser.displayName} !<br> Bora Economizar? </h4>
    </header>
    <div class='containerFeed'>
      <img class='fundo' src='imagens/fundo2.png' alt='imagem-fundo'>
    </div>
      <form id='formFeed' class='form-feed'>
        <label class='inputPubli' for='text'>
        <input id='post' class='input-publish' name='text' type='text' placeholder='Clique aqui para digitar seu CUPOM!'>
        </label>
        <span id='alertPublish' class='alert-publish'></span>
        <button class='btn' id='btnPubli' type='button'>Publicar</button>  
      </form>
    <section 
      id='postContainer' class='post-container'>
    </section>   
`;

  container.innerHTML = template;

  const btnPublicar = container.querySelector('.btn');
  const conteudo = container.querySelector('.input-publish');
  const formFeed = container.querySelector('.form-feed');
  const alertPublish = container.querySelector('.alert-publish');

  btnPublicar.addEventListener('click', () => {
    const conteudoInput = conteudo.value;
    if (conteudoInput !== '') {
      criarPost(conteudoInput)
        .then(() => {
          mostrarPost();
          formFeed.reset();
          alertPublish.setAttribute('style', 'display: none');
        })
        .catch((error) => {
          console.log(error);
          alertPublish.setAttribute('style', 'display: block');
          alertPublish.innerHTML = 'Ocorreu um erro, tente novamente.';
        });
    } else {
      alertPublish.setAttribute('style', 'display: block');
      alertPublish.innerHTML = 'Por favor, escreva algo antes de publicar!';
    }
  });

  async function mostrarPost() {
    const arrayPost = await pegarPost();
    const postContainer = container.querySelector('#postContainer');
    postContainer.innerHTML = '';

    arrayPost.forEach((post) => {
      const postar = document.createElement('div');
      postar.innerHTML = ` 
      <section class='conteudo'>
       <h3 class='nome'> ${post.name}</h3>
       <p class='conteudoPag'> ${post.texto}</p>
       <div class='btns'>
           <button class='btnLike' ${
             post.like.includes(auth.currentUser.uid) ? ' liked' : ''
           }' data-post-id='${post.id}'>❤️</button>
           <span class='contadorLike'> ${post.like.length}</span>
           <button class='btnEditar' data-post-id='${post.id}'> ✏️ </button>
           <button class='btnDeletar' data-post-id='${post.id}'> 🗑️ </button>
       </div>
      </section> `;

      postContainer.appendChild(postar);

      const btnLike = postar.querySelector('.btnLike');

      btnLike.addEventListener('click', async () => {
        const postId = btnLike.getAttribute('data-post-id');
        const contadorLike = postar.querySelector('.contadorLike');

        try {
          await likePost(db, postId, auth.currentUser.uid, auth);
          const atualizar = await getDoc(doc(db, 'post', postId));
          const atualizarLikes = atualizar.data().like.length;
          contadorLike.textContent = atualizarLikes;

          if (atualizar.data().like.includes(auth.currentUser.uid)) {
            btnLike.classList.add('liked');
          } else {
            btnLike.classList.remove('liked');
          }
        } catch (error) {
          console.log('Error', error);
        }
      });

      const btnEditar = postar.querySelector('.btnEditar');
      btnEditar.addEventListener('click', () => {
        const postId = btnEditar.getAttribute('data-post-id');
        if (post.author === auth.currentUser.uid) {
          const textoEditado = prompt('Digite o novo texto:');
          if (textoEditado) {
            editarPost(postId, textoEditado);
            postar.querySelector('.conteudoPag').textContent = textoEditado;
          }
        } else {
          alert('Você só pode editar a sua publicação!');
        }
      });

      const btnDeletar = postar.querySelector('.btnDeletar');
      btnDeletar.addEventListener('click', async () => {
        const idPost = btnDeletar.getAttribute('data-post-id');
        if (post.author === auth.currentUser.uid) {
          if (confirm('Tem certeza que deseja excluir essa publicação?')) {
            try {
              await deletarPost(idPost);
              postar.remove();
            } catch (error) {
              console.log('Erro ao exclur post:, error');
            }
          } else {
            alert('Você só pode excluir a sua publicação!');
          }
        }
      });
    });

    const botaoSair = container.querySelector('.btnSair');
    botaoSair.addEventListener('click', () => {
      logout()
        .then(() => {
          window.location.hash = '#home';
        })
        .catch(() => {
          alert('Erro ao Sair!');
        });
    });
  }
  mostrarPost();

  return container;
};
