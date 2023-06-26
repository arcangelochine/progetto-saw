import { User } from "firebase/auth";
import {
  Form,
  InputWithLabel,
  Modal,
  ModalBackground,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Paragraph,
  PrimaryButton,
  Subtitle,
} from "../utils";
import { useState } from "react";
import { DangerButton } from "../utils/Buttons";
import { ServerError, removeUser } from "../../config/Auth";

const REQUIRED_ERROR = "Campo obbligatorio";
const UNKNOWN_ERROR = "Errore del server";

interface DeletionModalProps {
  user: User;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletionModal = ({ user, closeModal }: DeletionModalProps) => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] =
    useState(REQUIRED_ERROR);
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // anti-spam
    if (loading) return;

    setLoading(true);

    if (password.length === 0) {
      setIsPasswordValid(false);
      setPasswordErrorMessage(REQUIRED_ERROR);
      setLoading(false);
      return;
    }

    if (user)
      removeUser(user, password)
        .catch((err) => {
          switch (err.construct) {
            case ServerError:
              setPasswordErrorMessage(UNKNOWN_ERROR);
              setIsPasswordValid(false);
              break;
            default:
              setPasswordErrorMessage(UNKNOWN_ERROR);
              setIsPasswordValid(false);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <Subtitle>Elimina il tuo account</Subtitle>
        </ModalHeader>
        <ModalContent>
          <Paragraph>
            Inserisci la password per eliminare il tuo account
          </Paragraph>
          <Form onSubmit={submit}>
            <InputWithLabel
              label="password"
              isValid={isPasswordValid}
              errorMessage={passwordErrorMessage}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(true);
              }}
              onFocus={() => {
                setIsPasswordValid(true);
              }}
            />
            <DangerButton type="submit">Elimina account</DangerButton>
          </Form>
        </ModalContent>
        <ModalFooter>
          <PrimaryButton
            onClick={() => {
              closeModal(false);
            }}
          >
            Annulla
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    </ModalBackground>
  );
};

export default DeletionModal;
