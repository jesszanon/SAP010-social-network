import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  getAuth
} from "firebase/auth";
import { loginGoogle, loginUser, signUpUser } from "../src/lib/index";
import { criarPost, pegarPost } from "../src/lib/firestone";
import { addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";


jest.mock("firebase/auth");
jest.mock('firebase/firestore/lite');
beforeEach(() => {
  jest.clearAllMocks();
});

describe("loginGoogle", () => {
  it("Deve ser uma função de logar com google", async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe("createUser", () => {
  it("criando um usuário", async () => {
    const user = {
      email: "test@hotmail.com",
      password: "345678",
    };

    createUserWithEmailAndPassword.mockResolvedValue({ user });
    await signUpUser(user.email, user.password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      user.email,
      user.password,
      auth
    );
  });
});

describe("loginUser", () => {
  it("logar com e-mail", async () => {
    const email = "test2@hotmail.com";
    const password = "98765432";
    signInWithEmailAndPassword.mockResolvedValueOnce();
    await loginUser(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      email,
      password
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
    }]);
    pegarPost('x4H2994HPjV9zm6cp7am58XTjci2', '0pRNd4MNFXm3QAI2TYeL', ['J5rtQSlAJqO13E7znQknbvC236U2', 'scbc2YPdX5gnlsKodSzDLh3mpPr2'], 'Tamyres melo', 'Parabéns, meninas. Achei incrível!');
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
