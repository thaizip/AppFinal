import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
   onAuthStateChanged, signOut} 
   from "firebase/auth";

export async function cadastrar(email, senha, confirmaSenha) {
  createUserWithEmailAndPassword(auth, email, senha)
  .then((dadosDoUsuario) => {
    console.log(dadosDoUsuario)
  })
  .catch((error) => {
    console.log(error)
  });
}

export async function logar(email, senha) {
  signInWithEmailAndPassword(auth, email, senha)
  .then((dadosDoUsuario) => {
    console.log("Usuário logado", dadosDoUsuario)
  })
  .catch((error) => {
    console.log(error)
  });
}

export function verificarEstadoLogin(callback) {
  onAuthStateChanged(auth, (usuario) => {
    callback(usuario);
  });
}

export function Logoff() {
  signOut(auth)
    .then(() => {
      console.log('Usuário desconectado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao fazer logout:', error);
    });
}

