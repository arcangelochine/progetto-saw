import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WrongCredentialError, login } from "../../config/Auth";
import {
  AuthBody,
  AuthErrorContainer,
  AuthHeader,
  Form,
  InputWithLabel,
} from "../utils";
import { PrimaryButton } from "../utils";

const UNKNOWN_ERROR = "Errore del server";
const LOGIN_ERROR = "Credenziali errate";

interface LoginData<T extends string | boolean> {
  username_or_email: T;
  password: T;
}

interface AuthState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  // Campi del form
  const [formData, setFormData] = useState<LoginData<string>>({
    username_or_email: "",
    password: "",
  });

  // Stato dell'autenticazione
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: false,
    errorMessage: UNKNOWN_ERROR,
  });

  const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    // prevenzione spam
    if (authState.loading) return;

    setAuthState({ ...authState, loading: true });

    const username_or_email = formData.username_or_email;
    const password = formData.password;

    // Se i campi non sono stati compilati
    if (username_or_email.length === 0 || password.length === 0) {
      setAuthState({ loading: false, error: true, errorMessage: LOGIN_ERROR });
      return;
    }

    // Se i campi sono stati compilati
    login(username_or_email, password)
      .then(() => {
        // Accesso completato
        navigate("/home");
      })
      .catch((err) => {
        // Problemi durante l'accesso
        switch (err.constructor) {
          case WrongCredentialError:
            setAuthState({
              ...authState,
              error: true,
              errorMessage: LOGIN_ERROR,
            });
            break;
          default:
            setAuthState({
              ...authState,
              error: true,
              errorMessage: UNKNOWN_ERROR,
            });
            break;
        }
      })
      .finally(() => {
        setAuthState({ ...authState, loading: false });
      });
  };

  return (
    <AuthBody>
      <AuthHeader>
        logo<h1>iSort</h1>
      </AuthHeader>
      <Form>
        {authState.error && (
          <AuthErrorContainer>{authState.errorMessage}</AuthErrorContainer>
        )}
        <InputWithLabel
          label="Username/Email"
          type="text"
          onChange={(e) => {
            setFormData({ ...formData, username_or_email: e.target.value });
          }}
        />
        <InputWithLabel
          label="Password"
          type="password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <PrimaryButton
          style={{ width: "100%", marginTop: "10px" }}
          onClick={submit}
        >
          Accedi
        </PrimaryButton>
      </Form>
      <span>
        Non hai un account? <a href="/register">Registrati ora</a>
      </span>
    </AuthBody>
  );
};

export default LoginForm;
