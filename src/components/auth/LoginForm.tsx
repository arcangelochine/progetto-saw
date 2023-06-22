import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WrongCredentialError, login } from "../../config/Auth";
import {
  AuthErrorContainer,
  Form,
  InputWithLabel,
  PrimaryButton,
} from "../utils";

const UNKNOWN_ERROR = "Errore del server";
const LOGIN_ERROR = "Credenziali errate";

const LoginForm = () => {
  const navigate = useNavigate();

  // Campi del form
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stato dell'autenticazione
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(UNKNOWN_ERROR);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prevenzione spam
    if (loading) return;

    setLoading(true);

    // Se i campi non sono stati compilati
    if (usernameOrEmail.length === 0 || password.length === 0) {
      setLoading(false);
      setError(true);
      setErrorMessage(LOGIN_ERROR);
      return;
    }

    // Se i campi sono stati compilati
    login(usernameOrEmail, password)
      .then(() => {
        // Accesso completato
        navigate("/home");
      })
      .catch((err) => {
        setError(true);
        // Problemi durante l'accesso
        switch (err.constructor) {
          case WrongCredentialError:
            setErrorMessage(LOGIN_ERROR);
            break;
          default:
            setErrorMessage(UNKNOWN_ERROR);
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
        label="Username/Email"
        type="text"
        value={usernameOrEmail}
        onChange={(e) => {
          setUsernameOrEmail(e.currentTarget.value);
        }}
      />
      <InputWithLabel
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <PrimaryButton type="submit" disabled={loading}>
        Accedi
      </PrimaryButton>
    </Form>
  );
};

export default LoginForm;
