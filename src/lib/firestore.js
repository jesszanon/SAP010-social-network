import { getAuth } from 'firebase/auth';
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { app } from './firebase.js';

const db = getFirestore(app);


export const criarPost = async (textPost) => {
  const auth = getAuth(app);

  const docRef = await addDoc(collection(db, 'post'), {
    name: auth.currentUser.displayName,
    author: auth.currentUser.uid,
    texto: textPost,
    like: [],
  });
  return docRef;
};


export const pegarPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'post'));
  const postArray = [];
  querySnapshot.forEach((post) => {
    postArray.push({ ...post.data(), id: post.id });
  });

  return postArray;
};


export const likePost = async (db,  postId, userId) => {
    const postRef = doc(db, 'post', postId);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();
    
  
    const isLiked = postData.like.includes(userId);
  
    const updatedLikeArray = isLiked
      ? postData.like.filter((id) => id !== userId)
      : [...postData.like, userId];
  
    await updateDoc(postRef, { like: updatedLikeArray });

};

export const editarPost = async (idPost, textPost) => {
  const editPost = doc(db, 'post', idPost);
  await updateDoc(editPost, { content: textPost });
};

export const deletarPost = async (idPost) => {
  const deletPost = await deleteDoc(doc(db, 'post', idPost));
  return deletPost;
};