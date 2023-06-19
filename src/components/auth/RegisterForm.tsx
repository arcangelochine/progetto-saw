import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthErrorContainer,
  Form,
  InputButton,
  InputWithLabel,
} from "../utils";
import {
  AlreadyInUseError,
  AuthError,
  BadCredentialError,
  register,
} from "../../config/Auth";
import assert from "assert";

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 32;

const REQUIRED_ERROR = "Campo obbligatorio";
const UNKNOWN_ERROR = "Errore del server";
const NOT_AVAILABLE_ERROR = "Non disponibile";
const TOO_SHORT_ERROR = `Almeno ${MIN_USERNAME_LENGTH} caratteri`;
const TOO_LONG_ERROR = `Al massimo ${MAX_USERNAME_LENGTH} caratteri`;
const ALREADY_IN_USE_ERROR = "Già in uso";
const NOT_EQUAL_ERROR = "Le password non coincidono";

const BAD_USERNAME_ERROR = "Non valido";
const BAD_EMAIL_ERROR = "Non valida";
const BAD_PASSWORD_ERROR = "Almeno 6 caratteri";

const RegisterForm = () => {
  const navigate = useNavigate();

  // Campi del form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Convalida dei campi del form
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

  // Messaggi di errore dei campi del form
  const [usernameErrorMessage, setUsernameErrorMessage] =
    useState(REQUIRED_ERROR);
  const [emailErrorMessage, setEmailErrorMessage] = useState(REQUIRED_ERROR);
  const [passwordErrorMessage, setPasswordErrorMessage] =
    useState(REQUIRED_ERROR);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState(REQUIRED_ERROR);

  // Stato dell'autenticazione
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(UNKNOWN_ERROR);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // anti-spam
    if (loading) return;

    setLoading(true);

    // variabili locali su cui fare il check
    let checksum = true;

    // Validazione (offline) username
    if (username.length === 0) {
      setUsernameErrorMessage(REQUIRED_ERROR);
      setUsernameIsValid(false);
      checksum = false;
    }

    if (username.length > 0 && username.length < MIN_USERNAME_LENGTH) {
      setUsernameErrorMessage(TOO_SHORT_ERROR);
      setUsernameIsValid(false);
      checksum = false;
    }

    if (username.length > MAX_USERNAME_LENGTH) {
      setUsernameErrorMessage(TOO_LONG_ERROR);
      setUsernameIsValid(false);
      checksum = false;
    }

    // Validazione (offline) email
    if (email.length === 0) {
      setEmailErrorMessage(REQUIRED_ERROR);
      setEmailIsValid(false);
      checksum = false;
    }

    // Validazione (offline) password
    if (password.length === 0) {
      setPasswordErrorMessage(REQUIRED_ERROR);
      setPasswordIsValid(false);
      checksum = false;
    }

    // Validazione (offline) confirmPassword
    if (confirmPassword.length === 0) {
      setConfirmPasswordErrorMessage(REQUIRED_ERROR);
      setConfirmPasswordIsValid(false);
      checksum = false;
    }

    if (confirmPassword.length)
      if (password !== confirmPassword) {
        setConfirmPasswordErrorMessage(NOT_EQUAL_ERROR);
        setConfirmPasswordIsValid(false);
        checksum = false;
      }

    // Almeno un campo non è valido
    if (!checksum) {
      setLoading(false);
      return;
    }

    // Tutti i campi sono validi (offline)
    register(username, email, password, confirmPassword)
      .then(() => {
        // Registrato con successo
        navigate("/home");
      })
      .catch((err: AuthError) => {
        // Problemi durante la registrazione (https://www.youtube.com/watch?v=G8oez6NoPGM)
        switch (err.constructor) {
          case BadCredentialError:
            // Campi mal formati
            assert(err instanceof BadCredentialError);
            switch (err.getWhich()) {
              case "USERNAME":
                // Errore username
                switch (err.getType()) {
                  case "MISSING":
                    setUsernameErrorMessage(REQUIRED_ERROR);
                    break;
                  case "TOO_SHORT":
                    setUsernameErrorMessage(TOO_SHORT_ERROR);
                    break;
                  case "TOO_LONG":
                    setUsernameErrorMessage(TOO_LONG_ERROR);
                    break;
                  default:
                    setUsernameErrorMessage(BAD_USERNAME_ERROR);
                    break;
                }
                setUsernameIsValid(false);
                break;
              case "EMAIL":
                // Errore email
                switch (err.getType()) {
                  case "MISSING":
                    setEmailErrorMessage(REQUIRED_ERROR);
                    break;
                  default:
                    setEmailErrorMessage(BAD_EMAIL_ERROR);
                    break;
                }
                setEmailIsValid(false);
                break;
              case "PASSWORD":
                // Errore password
                switch (err.getType()) {
                  case "MISSING":
                    setPasswordErrorMessage(REQUIRED_ERROR);
                    break;
                  default:
                    setPasswordErrorMessage(BAD_PASSWORD_ERROR);
                }
                setPasswordIsValid(false);
                break;
              case "CONFIRM":
                // Errore confirmPassword
                switch (err.getType()) {
                  case "MISSING":
                    setConfirmPasswordErrorMessage(REQUIRED_ERROR);
                    break;
                  case "NOT_EQUAL":
                    setConfirmPasswordErrorMessage(NOT_EQUAL_ERROR);
                    break;
                  default:
                    break;
                }
                setConfirmPasswordIsValid(false);
                break;
            }
            break;
          case AlreadyInUseError:
            // Email o username già in uso
            assert(err instanceof AlreadyInUseError);
            switch (err.getWhich()) {
              case "USERNAME":
                setUsernameErrorMessage(NOT_AVAILABLE_ERROR);
                setUsernameIsValid(false);
                break;
              case "EMAIL":
                setEmailErrorMessage(ALREADY_IN_USE_ERROR);
                setEmailIsValid(false);
                break;
              default:
                break;
            }
            break;
          default:
            setErrorMessage(UNKNOWN_ERROR);
            setError(true);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={submit}>
      {error && <AuthErrorContainer>{errorMessage}</AuthErrorContainer>}
      <InputWithLabel
        label="Username"
        type="text"
        value={username}
        length={MAX_USERNAME_LENGTH}
        isValid={usernameIsValid}
        errorMessage={usernameErrorMessage}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        onFocus={() => {
          setUsernameIsValid(true);
        }}
      />
      <InputWithLabel
        label="Email"
        type="text"
        value={email}
        isValid={emailIsValid}
        errorMessage={emailErrorMessage}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onFocus={() => {
          setEmailIsValid(true);
        }}
      />
      <InputWithLabel
        label="Password"
        type="password"
        value={password}
        isValid={passwordIsValid}
        errorMessage={passwordErrorMessage}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onFocus={() => {
          setPasswordIsValid(true);
        }}
      />
      <InputWithLabel
        label="Confirm password"
        type="password"
        value={confirmPassword}
        isValid={confirmPasswordIsValid}
        errorMessage={confirmPasswordErrorMessage}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        onFocus={() => {
          setConfirmPasswordIsValid(true);
        }}
      />
      <InputButton type="submit" disabled={loading}>
        Registrati
      </InputButton>
    </Form>
  );
};

export default RegisterForm;
