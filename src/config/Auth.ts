import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { User, userConverter } from "../entities";
import { createUserWithEmailAndPassword } from "firebase/auth";

export class UsernameAlreadyInUseError extends Error {}
export class UsernameTooShortError extends Error {}
export class UsernameTooLongError extends Error {}

export class EmailAlreadyInUseError extends Error {}
export class MissingEmailError extends Error {}
export class BadEmailError extends Error {}

export class MissingPasswordError extends Error {}
export class BadPasswordError extends Error {}
export class ConfirmPasswordError extends Error {}

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 32;

const users = collection(db, "users").withConverter(userConverter);

/**
 *
 * @returns Promise che restituisce tutti i documenti della collezione **users**
 * @warning Se la Promise fallisce, non è garantita la veridicità dei dati
 */
export const getAllUsernames = async () => {
  // La query restituisce tutti i documenti della collezione **users**
  const queryDoc = query(users);

  // L'array viene riempito se getDocs ha successo
  let usernames = new Array<String>();

  return getDocs(queryDoc)
    .then((docs) => {
      docs.forEach((doc) => {
        // Lo **username** è case insensitive
        usernames.push(doc.get("username"));
      });

      return usernames;
    })
    .catch(() => {
      // Restituire un array vuoto può essere pericoloso: undefined behaviour
      return usernames;
    });
};

/**
 *
 * @param username Username da verificare
 * @returns Restituisce una Promise che determina se **username** è unico
 */
export const isUsernameUnique = async (username: string) => {
  // Lo username è case insensitive
  const lower = username.toLowerCase();

  // La query restituisce i documenti della collezione users in cui data.username == lower
  const queryDoc = query(users, where("username", "==", lower));

  return getDocs(queryDoc)
    .then((snap) => {
      // snap.empty === true sse l'username è unico
      return snap.empty;
    })
    .catch(() => {
      // Non possiamo garantire che lo **username** sia unico
      return false;
    });
};

/**
 *
 * @param pwd1 Password
 * @param pwd2 Conferma password
 * @returns **true** se le password sono uguali, **false** altrimenti
 */
export const isPasswordConfirmed = (pwd1: string, pwd2: string) => {
  return pwd1 === pwd2;
};

/**
 *
 * @param username Username
 * @param email Email
 * @param password Password
 * @param confirm Conferma password
 * @returns Restituisce la Promise fornita da **firebase** per l'autenticazione con email e password
 */
export const register = async (
  username: string,
  email: string,
  password: string,
  confirm: string
) => {
  const lower = username.toLowerCase();
  const lowerEmail = email.toLowerCase();

  if (!isPasswordConfirmed(password, confirm)) throw new ConfirmPasswordError();

  if (username.length < MIN_USERNAME_LENGTH) throw new UsernameTooShortError();

  if (username.length > MAX_USERNAME_LENGTH) throw new UsernameTooLongError();

  if (!(await isUsernameUnique(lower))) throw new UsernameAlreadyInUseError();

  return createUserWithEmailAndPassword(auth, lowerEmail, password)
    .then(() => {
      // Creo un nuovo utente
      const user = new User(lower, username, lowerEmail, 10, new Date());

      // Aggiungo l'utente al database
      addDoc(users, user).catch((error) => {
        // todo: gestire errori addDoc
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
        console.log(error);
      });
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new EmailAlreadyInUseError();
        case "auth/missing-email":
          throw new MissingEmailError();
        case "auth/invalid-email":
          throw new BadEmailError();
        case "auth/missing-password":
          throw new MissingPasswordError();
        case "auth/weak-password":
          throw new BadPasswordError();
        default:
          throw new Error();
      }
    });
};
