import { useContext, useState } from "react";
import {
  Body,
  Content,
  Form,
  Header,
  InputWithLabel,
  Navbar,
  PrimaryButton,
  Title,
} from "../components/utils";
import { AuthContext } from "../core";
import {
  AlreadyInUseError,
  BadCredentialError,
  updateUsername,
} from "../config/Auth";

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 32;

const REQUIRED_ERROR = "Campo obbligatorio";
const TOO_SHORT_ERROR = `Almeno ${MIN_USERNAME_LENGTH} caratteri`;
const TOO_LONG_ERROR = `Al massimo ${MAX_USERNAME_LENGTH} caratteri`;
const BAD_USERNAME_ERROR = "Non valido";
const UNKNOWN_ERROR = "Errore del server";
const ALREADY_IN_USE_ERROR = "Già in uso";

// Pagina per gestire un utente
const User = () => {
  const user = useContext(AuthContext);

  const [username, setUsername] = useState(user?.displayName || "");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [usernameErrorMessage, setUsernameErrorMessage] =
    useState(REQUIRED_ERROR);
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // anti-spam
    if (loading) return;

    setLoading(true);

    let checksum = true;

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

    if (!checksum) {
      setLoading(false);
      return;
    }

    if (user)
      updateUsername(user, username)
        .catch((err) => {
          switch (err.constructor) {
            case BadCredentialError:
              setUsernameIsValid(false);
              switch ((err as BadCredentialError).getType()) {
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
              break;
            case AlreadyInUseError:
              setUsernameIsValid(false);
              setUsernameErrorMessage(ALREADY_IN_USE_ERROR);
              break;
            default:
              setUsernameIsValid(false);
              setUsernameErrorMessage(UNKNOWN_ERROR);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <Body>
      <Navbar page="EDIT" />
      <Header>
        <Title>Modifica il tuo account</Title>
      </Header>
      <Content>
        {user && (
          <Form onSubmit={submit}>
            <InputWithLabel
              label="Username"
              isValid={usernameIsValid}
              errorMessage={usernameErrorMessage}
              type="text"
              value={username}
              maxLength={MAX_USERNAME_LENGTH}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameIsValid(true);
              }}
              onFocus={() => {
                setUsernameIsValid(true);
              }}
            />
            <PrimaryButton type="submit">Modifica username</PrimaryButton>
          </Form>
        )}
      </Content>
    </Body>
  );
};

export default User;
