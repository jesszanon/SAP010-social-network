import { signUpUser } from '../../lib/index.js';
import fundo from '../../imagens/fundo.png';
import logomania from '../../imagens/logomania.png';
import etiqueta from '../../imagens/etiqueta.png';

export default () => {
  const container = document.createElement('div');

  const template = `
  <div class='containerHome'>
     <img class='fundo1' src='${fundo}' alt='imagem-fundo1'>
   </div>
  <div class='container' id='container-template'>
    <header>
      <img class='logo' src= '${logomania}' alt='logo'>
    </header>
    <form class='form' id='form'>
            <img class='etiqueta' src='${etiqueta}' alt='etiqueta' />
                <h2>A REDE SOCIAL PARA QUEM <br> GOSTA DE ECONOMIZAR!</h2>
                <p class='nome'>
                <input type='text' class='inserir_nome' id='inserirnome' placeholder='Digite seu Nome e Sobrenome'/>
                </p>
                <p class='email'>
                <input type='text' class='inserir_email2' id='inseriremail2' placeholder='Digite seu e-mail'/>
                </p>
                <p class='senha'>
                <input type='text' class='digite_senha2' id='digitesenha2' placeholder='Digite uma senha'/>
                </p>
                <p class='confirmasenha'>
                <input type='text' class='confirma_senha' id='confirmasenha' placeholder='Confirme sua senha'/>
                <span id='usuarioAlert' class='alertCadastro'></span>
                </p> 
            </form>
  
            <p class='form'>
              <button class='btnCadastrar2' id='btnCadastrar'>CADASTRAR!</button>  
            </p>
       </div>
    </div>
  
    
    `;

  container.innerHTML = template;

  const email2 = container.querySelector('.inserir_email2');
  const password2 = container.querySelector('.digite_senha2');
  const name = container.querySelector('.inserir_nome');
  const passwordrepet = container.querySelector('.confirma_senha');
  const register = container.querySelector('.btnCadastrar2');

  register.addEventListener('click', () => {
    signUpUser(name.value, email2.value, password2.value)
      .then(() => {
        alert('Usuário cadastrado com sucesso!');
        window.location.hash = '#feed';
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
          usuarioAlert.setAttribute('style', 'display: block');
          usuarioAlert.innerHTML = 'E-mail já cadastrado!';
        }
        if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
          usuarioAlert.setAttribute('style', 'display: block');
          usuarioAlert.innerHTML = 'Endereço de e-mail inválido!';
        }
        if (
          errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          usuarioAlert.setAttribute('style', 'display: block');
          usuarioAlert.innerHTML = 'Senha com mínimo de 6 dígitos!';
        }
        if (password2.value !== passwordrepet.value) {
          usuarioAlert.setAttribute('style', 'display: block');
          usuarioAlert.innerHTML = 'As senhas devem ser iguais!';
        }
      });
  });

  return container;
};