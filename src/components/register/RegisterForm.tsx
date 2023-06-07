import { useState } from "react";
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

  const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    // anti-spam
    if (authState.loading) return;

    setAuthState({ ...authState, loading: true, error: false });

    const username = formData.username;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    let errorMessage: RegisterData<string> = formErrorMessage;

    let valid: RegisterData<boolean> = formValidation;

    // Validazione (offline) username
    if (username.length === 0) {
      errorMessage.username = REQUIRED_ERROR;
      valid.username = false;
    }

    if (username.length > 0 && username.length < MIN_USERNAME_LENGTH) {
      errorMessage.username = TOO_SHORT_ERROR;
      valid.username = false;
    }

    if (username.length > MAX_USERNAME_LENGTH) {
      errorMessage.username = TOO_LONG_ERROR;
      valid.username = false;
    }

    // Validazione (offline) email
    if (email.length === 0) {
      errorMessage.email = REQUIRED_ERROR;
      valid.email = false;
    }

    // Validazione (offline) password
    if (password.length === 0) {
      errorMessage.password = REQUIRED_ERROR;
      valid.password = false;
    }

    // Validazione (offline) confirmPassword
    if (confirmPassword.length === 0) {
      errorMessage.confirmPassword = REQUIRED_ERROR;
      valid.confirmPassword = false;
    }

    if (confirmPassword.length)
      if (password !== confirmPassword) {
        errorMessage.confirmPassword = NOT_EQUAL_ERROR;
        valid.confirmPassword = false;
      }

    // Almeno un campo non è valido
    if (
      !valid.username ||
      !valid.email ||
      !valid.password ||
      !valid.confirmPassword
    ) {
      setFormErrorMessage(errorMessage);
      setFormValidation(valid);
      setAuthState({ ...authState, loading: false });
      return;
    }

    // Tutti i campi sono validi (offline)
    register(username, email, password, confirmPassword)
      .then(() => {
        // Registrato con successo
        navigate("/home");
      })
      .catch((err) => {
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
