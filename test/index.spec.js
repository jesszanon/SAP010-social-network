import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  getAuth,
} from 'firebase/auth';
import { 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc,
  getFirestore,
  updateDoc,
  getDoc 
} from 'firebase/firestore';
import { loginGoogle, loginUser, signUpUser } from '../src/lib/index';
import { criarPost, pegarPost, deletarPost, editarPost, likePost } from '../src/lib/firestore';


jest.mock('firebase/auth');
jest.mock('firebase/firestore');
beforeEach(() => {
  jest.clearAllMocks();
});

describe('loginGoogle', () => {
  it('Deve ser uma função de logar com google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('createUser', () => {
  it('criando um usuário', async () => {
    const user = {
      name: 'Jessica',
      email: 'test@hotmail.com',
      password: '345678',
    };
    const mockAppAuth = {currentUser:'jessica'};
    getAuth.mockReturnValueOnce(mockAppAuth);

    createUserWithEmailAndPassword.mockResolvedValue({ user });
    await signUpUser(user.name,user.email, user.password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      mockAppAuth,
      user.email,
      user.password,
      
    );
  });
});

describe('loginUser', () => {
  it('logar com e-mail', async () => {
    const email = 'test2@hotmail.com';
    const password = '98765432';
    signInWithEmailAndPassword.mockResolvedValueOnce();
    await loginUser(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      email,
      password,
    );
  });
});

describe('criarPost', () => {
  it(' a função deve criar um post', async () => {
    const mockGetAuth = {
      currentUser: {
        displayName: 'nome',
        uid: '123',
      },
    };

    getAuth.mockReturnValueOnce(mockGetAuth);
    addDoc.mockResolvedValue();

    const texto = 'texto do meu post';
    await criarPost(texto);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(undefined, {
      name: mockGetAuth.currentUser.displayName,
      author: mockGetAuth.currentUser.uid,
      texto,
      like: [],
    });
  });
});

describe('pegarPost', () => {
  it('a função deve retornar um array com o post a ser printado na tela', () => {
    getDocs.mockResolvedValue([{
      author: {},
      id: {},
      like: [],
      name: {},
      texto: {},
      data: ()=> ({}),
    }]);
    pegarPost('x4H2994HPjV9zm6cp7am58XTjci2', '0pRNd4MNFXm3QAI2TYeL', ['J5rtQSlAJqO13E7znQknbvC236U2', 'scbc2YPdX5gnlsKodSzDLh3mpPr2'], 'Thalita', 'Parabéns!');
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
});

describe('deletarPost', () => {
  it('a função deve deletar um post a partir do id do usuário', async () => {
    const mockRef = {};
    const mockPostCollection = {
      posts: {
        postId: 'corre que tem cupom',
      },
    };

    doc.mockReturnValueOnce(mockRef);
    deleteDoc.mockResolvedValueOnce(mockRef);

    await deletarPost(mockPostCollection.posts.postId);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'post', mockPostCollection.posts.postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockRef);
  });
});
describe('likePost', () => {
  it('deve contabilizar like no banco de dados', async () => {
    const postId = 'IqTvgPPiC0PQTTlPeSdg';
    const db = getFirestore();
    const docRef = doc(db, 'post', postId);
    const updateDocMock = jest.fn();

    const postSnap = { data: () => ({ like: [] }) };

    const getDocMock = jest.fn().mockResolvedValue(postSnap);
    getDoc.mockImplementation(getDocMock);

    updateDoc.mockImplementation(updateDocMock);

    await likePost(db, postId);

    expect(updateDocMock).toHaveBeenNthCalledWith(1, docRef, { like: [undefined] });
  });
});
describe('editarPost', () => {
  it('deve editar as postagens do feed', async () => {
    const postId = 'postId';
    const textEdit = {
      content: 'novo input',
    };
    updateDoc.mockResolvedValueOnce();

    await editarPost(postId, textEdit);

    expect(updateDoc).toHaveBeenCalledTimes(1);
  });
});