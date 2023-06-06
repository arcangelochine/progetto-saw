import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputWithLabel, PrimaryButton } from "../utils";
import {
  BadEmailError,
  BadPasswordError,
  ConfirmPasswordError,
  EmailAlreadyInUseError,
  MissingEmailError,
  MissingPasswordError,
  UsernameAlreadyInUseError,
  UsernameTooLongError,
  UsernameTooShortError,
  getAllUsernames,
  register,
} from "../../config/Auth";

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 32;

const REQUIRED_ERROR = "Campo obbligatorio";
const UNKNOWN_ERROR = "Errore del server";
const NOT_AVAILABLE_ERROR = "Non disponibile";
const TOO_SHORT_ERROR = `Almeno ${MIN_USERNAME_LENGTH} caratteri`;
const TOO_LONG_ERROR = `Al massimo ${MAX_USERNAME_LENGTH} caratteri`;
const ALREADY_IN_USE_ERROR = "Già in uso";
const NOT_EQUAL_ERROR = "Le password non coincidono";

const BAD_EMAIL_ERROR = "Non valida";
const BAD_PASSWORD_ERROR = "Almeno 6 caratteri";

interface RegisterData<T extends string | boolean> {
  username: T;
  email: T;
  password: T;
  confirmPassword: T;
}

interface AuthState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();

  const [usernames, setUsernames] = useState(new Array<String>());
  const [emails, setEmails] = useState(new Array<String>());

  // Campi del form
  const [formData, setFormData] = useState<RegisterData<string>>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // Convalida dei campi del form
  const [formValidation, setFormValidation] = useState<RegisterData<boolean>>({
    username: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  // Messaggi di errore dei campi del form
  const [formErrorMessage, setFormErrorMessage] = useState<
    RegisterData<string>
  >({
    username: REQUIRED_ERROR,
    email: REQUIRED_ERROR,
    password: REQUIRED_ERROR,
    confirmPassword: REQUIRED_ERROR,
  });
  // Stato dell'autenticazione
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: false,
    errorMessage: UNKNOWN_ERROR,
  });

  // Validazione username
  useEffect(() => {
    const username = formData.username;
    let valid = true;

    if (username.length < MIN_USERNAME_LENGTH) {
      valid = false;
      setFormErrorMessage({ ...formErrorMessage, username: TOO_SHORT_ERROR });
    }

    if (username.length > MAX_USERNAME_LENGTH) {
      valid = false;
      setFormErrorMessage({ ...formErrorMessage, username: TOO_LONG_ERROR });
    }

    if (usernames.includes(username)) {
      valid = false;
      setFormErrorMessage({
        ...formErrorMessage,
        username: NOT_AVAILABLE_ERROR,
      });
    }

    setFormValidation({ ...formValidation, username: valid });
  }, [formData, formErrorMessage, formValidation, usernames]);

  // Validazione email
  useEffect(() => {
    const email = formData.email;
    let valid = true;

    if (emails.includes(email)) {
      valid = false;
      setFormErrorMessage({ ...formErrorMessage, email: ALREADY_IN_USE_ERROR });
    }

    setFormValidation({ ...formValidation, email: valid });
  }, [formData, emails, formValidation, formErrorMessage]);

  // Validazione password
  useEffect(() => {
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    let valid = true;

    if (confirmPassword.length)
      if (password !== confirmPassword) {
        valid = false;
        setFormErrorMessage({
          ...formErrorMessage,
          confirmPassword: NOT_EQUAL_ERROR,
        });
      }

    setFormValidation({ ...formValidation, confirmPassword: valid });
  }, [formData, formErrorMessage, formValidation]);

  // Scarico la lista di tutti gli username
  useEffect(() => {
    getAllUsernames().then((res) => {
      setUsernames(res);
    });
  }, []);

  const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    // anti-spam
    if (authState.loading) return;

    setAuthState({ ...authState, loading: true });

    if (!formData.username.length) {
      setFormValidation({ ...formValidation, username: false });
      setFormErrorMessage({ ...formErrorMessage, username: REQUIRED_ERROR });
    }

    if (!formData.email.length) {
      setFormValidation({ ...formValidation, email: false });
      setFormErrorMessage({ ...formErrorMessage, email: REQUIRED_ERROR });
    }

    if (!formData.password.length) {
      setFormValidation({ ...formValidation, password: false });
      setFormErrorMessage({ ...formErrorMessage, password: REQUIRED_ERROR });
    }

    if (!formData.confirmPassword.length) {
      setFormValidation({ ...formValidation, confirmPassword: false });
      setFormErrorMessage({
        ...formErrorMessage,
        confirmPassword: REQUIRED_ERROR,
      });
    }

    if (
      !formValidation.username ||
      !formValidation.email ||
      !formValidation.password ||
      !formValidation.confirmPassword
    ) {
      setAuthState({ ...authState, loading: false });
      return;
    }

    register(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    )
      .then(() => {
        // Registrato con successo
        navigate("/home");
      })
      .catch((err) => {
        // Aggiorno la lista degli username
        getAllUsernames().then((res) => setUsernames(res));

        // Problemi durante la registrazione (https://www.youtube.com/watch?v=G8oez6NoPGM)
        switch (err.constructor) {
          case UsernameAlreadyInUseError:
            setFormErrorMessage({
              ...formErrorMessage,
              username: NOT_AVAILABLE_ERROR,
            });
            setFormValidation({ ...formValidation, username: false });
            break;
          case UsernameTooShortError:
            setFormErrorMessage({
              ...formErrorMessage,
              username: TOO_SHORT_ERROR,
            });
            setFormValidation({ ...formValidation, username: false });
            break;
          case UsernameTooLongError:
            setFormErrorMessage({
              ...formErrorMessage,
              username: TOO_LONG_ERROR,
            });
            setFormValidation({ ...formValidation, username: false });
            break;
          case EmailAlreadyInUseError:
            setEmails(emails.concat([formData.email.toLowerCase()]));
            setFormErrorMessage({
              ...formErrorMessage,
              email: ALREADY_IN_USE_ERROR,
            });
            setFormValidation({ ...formValidation, email: false });
            break;
          case MissingEmailError:
            setFormErrorMessage({
              ...formErrorMessage,
              email: REQUIRED_ERROR,
            });
            setFormValidation({ ...formValidation, email: false });
            break;
          case BadEmailError:
            setFormErrorMessage({
              ...formErrorMessage,
              email: BAD_EMAIL_ERROR,
            });
            setFormValidation({ ...formValidation, email: false });
            break;
          case MissingPasswordError:
            setFormErrorMessage({
              ...formErrorMessage,
              password: REQUIRED_ERROR,
            });
            setFormValidation({ ...formValidation, password: false });
            break;
          case BadPasswordError:
            setFormErrorMessage({
              ...formErrorMessage,
              password: BAD_PASSWORD_ERROR,
            });
            setFormValidation({ ...formValidation, password: false });
            break;
          case ConfirmPasswordError:
            setFormErrorMessage({
              ...formErrorMessage,
              confirmPassword: NOT_EQUAL_ERROR,
            });
            setFormValidation({ ...formValidation, confirmPassword: false });
            break;
          default:
            setAuthState({ ...authState, error: true });
            break;
        }
      })
      .finally(() => {
        setAuthState({ ...authState, loading: false });
      });
  };

  return (
    <Form>
      {authState.error && <>{authState.errorMessage}</>}
      <InputWithLabel
        label="Username"
        type="text"
        length={MAX_USERNAME_LENGTH}
        isValid={formValidation.username}
        errorMessage={formErrorMessage.username}
        onChange={(e) => {
          setFormData({ ...formData, username: e.target.value });
        }}
        onFocus={() => {
          setFormValidation({ ...formValidation, username: true });
        }}
      />
      <InputWithLabel
        label="Email"
        type="text"
        isValid={formValidation.email}
        errorMessage={formErrorMessage.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }}
        onFocus={() => {
          setFormValidation({ ...formValidation, email: true });
        }}
      />
      <InputWithLabel
        label="Password"
        type="password"
        isValid={formValidation.password}
        errorMessage={formErrorMessage.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
        onFocus={() => {
          setFormValidation({ ...formValidation, password: true });
        }}
      />
      <InputWithLabel
        label="Confirm password"
        type="password"
        isValid={formValidation.confirmPassword}
        errorMessage={formErrorMessage.confirmPassword}
        onChange={(e) => {
          setFormData({ ...formData, confirmPassword: e.target.value });
        }}
        onFocus={() => {
          setFormValidation({ ...formValidation, confirmPassword: true });
        }}
      />
      <PrimaryButton onClick={submit}>Registrati</PrimaryButton>
    </Form>
  );
};

export default RegisterForm;
