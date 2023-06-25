import {
  KeywordInput,
  Modal,
  ModalBackground,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Paragraph,
  PrimaryButton,
  Subtitle,
} from "../utils";
import { DangerButton } from "../utils/Buttons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../core";
import { deleteInventory } from "../../config/Database";

const DELETION_KEY = "elimina";

interface DeletionModalProps {
  docId: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletionModal = ({ docId, closeModal }: DeletionModalProps) => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const deleteInventoryAndNavigate = (docId: string) => {
    if (loading) return;

    setLoading(true);

    if (!user || keyword !== DELETION_KEY) {
      setLoading(false);
      return;
    }

    deleteInventory(user, docId).finally(() => {
      setLoading(false);
      navigate("/home");
    });
  };

  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <Subtitle>Attenzione!</Subtitle>
        </ModalHeader>
        <ModalContent>
          <Paragraph>
            Eliminare un inventario è un'azione irreversibile!
          </Paragraph>
          <Paragraph>Digitare "elimina" per proseguire.</Paragraph>
          <KeywordInput
            value={keyword}
            placeholder={DELETION_KEY}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </ModalContent>
        <ModalFooter>
          <PrimaryButton onClick={() => closeModal(false)}>
            Annulla
          </PrimaryButton>
          <DangerButton onClick={() => deleteInventoryAndNavigate(docId)}>
            Elimina
          </DangerButton>
        </ModalFooter>
      </Modal>
    </ModalBackground>
  );
};

export default DeletionModal;
