import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { User as DBUser, userConverter } from "../entities";
import {
  EmailAuthProvider,
  Persistence,
  User,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { DocumentNotFoundError, deleteAllInventories } from "./Database";

// Persistenza dell'autenticazione
const persistence: Persistence = browserSessionPersistence;

type ErrorType =
  | "MISSING"
  | "TOO_LONG"
  | "TOO_SHORT"
  | "NOT_EQUAL"
  | "TOO_WEAK"
  | undefined;
type WhichType = "USERNAME" | "PASSWORD" | "EMAIL" | "CONFIRM";

// Errori in fase di autenticazione
export class BadCredentialError extends Error {
  private type: ErrorType;
  private which: WhichType;

  constructor(type: ErrorType = undefined, which: WhichType) {
    super();

    this.type = type;
    this.which = which;
  }

  public getType = () => this.type;

  public getWhich = () => this.which;
}
export class AlreadyInUseError extends Error {
  private which: WhichType;

  constructor(which: WhichType) {
    super();

    this.which = which;
  }

  public getWhich = () => this.which;
}
export class WrongCredentialError extends Error {}
export class ServerError extends Error {}

export type AuthError =
  | BadCredentialError
  | AlreadyInUseError
  | WrongCredentialError
  | ServerError;

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 32;

const users = collection(db, "users").withConverter(userConverter);

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
      return snap.docs[0].data().email;
    })
    .catch(() => {
      return "";
    });
};

/**
 *
 * @param email Email
 * @param password Password
 * @returns Restituisce la Promise fornita da **firebase** con gestione degli errori
 */
const singUp = async (email: string, password: string) => {
  const lower = email.toLowerCase();

  return createUserWithEmailAndPassword(auth, lower, password).catch(
    (error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new AlreadyInUseError("EMAIL");
        case "auth/missing-password":
          throw new BadCredentialError("MISSING", "PASSWORD");
        case "auth/missing-email":
          throw new BadCredentialError("MISSING", "EMAIL");
        case "auth/invalid-email":
          throw new BadCredentialError(undefined, "EMAIL");
        case "auth/weak-password":
          throw new BadCredentialError("TOO_WEAK", "PASSWORD");
        default:
          throw new ServerError();
      }
    }
  );
};

/**
 *
 * @param email Email
 * @param password Password
 * @returns Restituisce la Promise fornita da **firebase** con gestione degli errori
 */
const signIn = async (email: string, password: string) => {
  const lower = email.toLowerCase();

  return signInWithEmailAndPassword(auth, lower, password).catch((error) => {
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/wrong-password":
        throw new WrongCredentialError();
      default:
        throw new ServerError();
    }
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
  // Campi mancanti
  if (username.length === 0)
    throw new BadCredentialError("MISSING", "USERNAME");

  if (email.length === 0) throw new BadCredentialError("MISSING", "EMAIL");

  if (password.length === 0)
    throw new BadCredentialError("MISSING", "PASSWORD");

  if (confirm.length === 0) throw new BadCredentialError("MISSING", "CONFIRM");

  // Caratteri speciali non consentiti per lo username
  if (username.includes("@"))
    throw new BadCredentialError(undefined, "USERNAME");

  // Username troppo corto
  if (username.length < MIN_USERNAME_LENGTH)
    throw new BadCredentialError("TOO_SHORT", "USERNAME");

  // Username troppo lungo
  if (username.length > MAX_USERNAME_LENGTH)
    throw new BadCredentialError("TOO_LONG", "USERNAME");

  // Password non confermata
  if (!isPasswordConfirmed(password, confirm))
    throw new BadCredentialError("NOT_EQUAL", "CONFIRM");

  // Username e email vengono salvati in lower case
  const lower = username.toLowerCase();
  const lowerEmail = email.toLowerCase();

  // Unicità username
  const unique = await isUsernameUnique(lower);

  if (!unique) throw new AlreadyInUseError("USERNAME");

  // Lo username è unico
  return setPersistence(auth, persistence).then(async () => {
    return singUp(email, password).then((res) => {
      // Registrazione avvenuta con successo
      // Creo un nuovo utente
      const user = new DBUser(lower, username, lowerEmail, false, new Date());

      // Aggiungo l'utente al database (optimistic programming)
      addDoc(users, user);

      // Aggiorno le proprietà dell'utente
      updateProfile(res.user, { displayName: username });
    });
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
  // Campi mancanti
  if (username_or_email.length === 0)
    throw new BadCredentialError("MISSING", "USERNAME");

  if (password.length === 0)
    throw new BadCredentialError("MISSING", "PASSWORD");

  // Lo username è salvato in lower case
  const lower = username_or_email.toLowerCase();

  // Cerco la email nel database
  const email = await getEmailOfUser(lower);

  // Se non trovo la email nel database, assumo che **lower** sia la mail
  if (email.length === 0)
    return setPersistence(auth, persistence).then(async () => {
      return signIn(lower, password);
    });

  // Ho trovato la email nel database
  return setPersistence(auth, persistence).then(async () => {
    return signIn(email, password);
  });
};

/**
 *
 * @returns Restituisce la Promise fornita da **firebase** per il logout
 */
export const logout = async () => {
  return signOut(auth);
};

/**
 *
 * @param user Istanza dell'utente
 * @param username Nuovo username
 * @returns
 */
export const updateUsername = async (user: User, username: string) => {
  // Campi mancanti
  if (!user) return;

  if (!username || username.length === 0)
    throw new BadCredentialError("MISSING", "USERNAME");

  // Nessun cambiamento nel displayName => Nessun cambiamento nello username
  if (user.displayName === username) return;

  const isUsernameChanged =
    username.toLocaleLowerCase() !== user.displayName?.toLowerCase();

  // Caratteri speciali non consentiti per lo username
  if (username.includes("@"))
    throw new BadCredentialError(undefined, "USERNAME");

  // Username troppo corto
  if (username.length < MIN_USERNAME_LENGTH)
    throw new BadCredentialError("TOO_SHORT", "USERNAME");

  // Username troppo lungo
  if (username.length > MAX_USERNAME_LENGTH)
    throw new BadCredentialError("TOO_LONG", "USERNAME");

  // Lo username viene salvato in lower case
  const lower = username.toLowerCase();

  if (!isUsernameChanged) {
    return updateProfile(user, { displayName: username });
  }

  // Unicità username (se nuovo)
  const unique = await isUsernameUnique(lower);

  if (!unique) throw new AlreadyInUseError("USERNAME");

  // Lo username è unico
  return updateProfile(user, {
    displayName: username,
  }).then(async () => {
    const queryDoc = query(users, where("email", "==", user.email));

    // Cerco il documento dell'utente
    return getDocs(queryDoc).then((snap) => {
      // Se lo trovo, lo aggiorno
      if (!snap.docs) throw new DocumentNotFoundError();

      const docRef = snap.docs[0].ref;

      return updateDoc(docRef, { displayName: username, username: lower });
    });
  });
};

export const removeUser = async (user: User, password: string) => {
  // Campi mancanti
  if (!user) return;

  if (!password || password.length === 0) return;

  return reauthenticateWithCredential(
    user,
    EmailAuthProvider.credential(user.email!, password)
  )
    .then(async () => {
      // Elimino tutti gli inventari
      return deleteAllInventories(user).then(async () => {
        // Elimino l'utente
        return deleteUser(user)
          .then(() => {
            const queryDoc = query(users, where("email", "==", user.email));

            // Elimino il documento relativo all'utente
            return getDocs(queryDoc).then((snap) => {
              if (!snap.docs) throw new DocumentNotFoundError();

              const docRef = snap.docs[0].ref;

              return deleteDoc(docRef);
            });
          })
          .catch(() => {
            throw new ServerError();
          });
      });
    })
    .catch(() => {
      throw new ServerError();
    });
};
