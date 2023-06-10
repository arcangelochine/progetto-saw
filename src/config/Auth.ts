import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { User, userConverter } from "../entities";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Errori in fase di registrazione
export class BadUsernameError extends Error {}
export class UsernameAlreadyInUseError extends Error {}
export class UsernameTooShortError extends Error {}
export class UsernameTooLongError extends Error {}

export class EmailAlreadyInUseError extends Error {}
export class MissingEmailError extends Error {}
export class BadEmailError extends Error {}

export class MissingPasswordError extends Error {}
export class BadPasswordError extends Error {}
export class ConfirmPasswordError extends Error {}

// Errori in fase di accesso
export class MissingUsernameError extends Error {}
export class WrongUsernameOrPasswordError extends Error {}

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 32;

const users = collection(db, "users").withConverter(userConverter);

/**
 *
 * @param username Username da verificare
 * @returns Restituisce una Promise che determina se **username** è unico
 */
const isUsernameUnique = async (username: string) => {
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
const isPasswordConfirmed = (pwd1: string, pwd2: string) => {
  return pwd1 === pwd2;
};

/**
 *
 * @param username Username
 * @returns Restituisce l'email corrispondente all'utente con username=**username** della collection **users**
 */
const getEmailOfUser = async (username: string) => {
  // Lo username è case insensitive
  const lower = username.toLowerCase();

  // La query restituisce i documenti della collezione users in cui data.username == lower
  const queryDoc = query(users, where("username", "==", lower));

  return getDocs(queryDoc)
    .then((snap) => {
      return snap.docs[0].data().getEmail();
    })
    .catch(() => {
      return "";
    });
};

/**
 *
 * @param username Username
 * @param email Email
 * @param password Password
 * @param confirm Conferma password
 * @returns Restituisce la Promise fornita da **firebase** per l'autenticazione con email e password
 *
 * @side Registra l'utente nella collection **users**
 */
export const register = async (
  username: string,
  email: string,
  password: string,
  confirm: string
) => {
  const lower = username.toLowerCase();
  const lowerEmail = email.toLowerCase();

  // caratteri speciali non consentiti
  if (lower.includes("@")) throw new BadUsernameError();

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

/**
 *
 * @param username_or_email Username o Email
 * @param password Password
 * @returns Restituisce la Promise fornita da **firebase** per l'autenticazione con email e password
 *
 * @note se l'utente non viene trovato nella collection **users** si assume che sia stata fornita una email
 */
export const login = async (username_or_email: string, password: string) => {
  const lower = username_or_email.toLowerCase();

  if (lower.length === 0) throw new MissingUsernameError();

  if (password.length === 0) throw new MissingPasswordError();

  const email = await getEmailOfUser(lower);

  if (email.length === 0)
    return signInWithEmailAndPassword(auth, username_or_email, password).catch(
      (error) => {
        switch (error.code) {
          case "auth/wrong-password":
            throw new WrongUsernameOrPasswordError();
          default:
            throw new Error();
        }
      }
    );
  else
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      switch (error.code) {
        case "auth/wrong-password":
          throw new WrongUsernameOrPasswordError();
        default:
          throw new Error();
      }
    });
};
