import { useState } from "react";
import { InventoryState } from "./ItemTable";
import {
  Form,
  InputWithLabel,
  Modal,
  ModalBackground,
  ModalContent,
  ModalFooter,
  ModalHeader,
  PrimaryButton,
  Subtitle,
} from "../utils";

interface InventoryEditionModalProps {
  inventoryState: InventoryState;
  setInventoryState: React.Dispatch<React.SetStateAction<InventoryState>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const InventoryEditionModal = ({
  inventoryState,
  setInventoryState,
  closeModal,
}: InventoryEditionModalProps) => {
  const inventory = inventoryState.inventory;

  const [name, setName] = useState(inventory.name);

  const editInventory: React.FormEventHandler<HTMLFormElement> = (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();

    // Nessuna modifica
    if (name === inventory.name) {
      closeModal(false);
      return;
    }

    if (!name.length) return;

    setInventoryState((state) => ({
      ...state,
      inventory: inventory.editName(name),
      edited: true,
    }));

    closeModal(false);
  };

  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <Subtitle>Modifica l'inventario</Subtitle>
        </ModalHeader>
        <ModalContent>
          <Form onSubmit={editInventory}>
            <InputWithLabel
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <PrimaryButton type="submit">Modifica</PrimaryButton>
          </Form>
          <ModalFooter>
            <PrimaryButton onClick={() => closeModal(false)}>
              Annulla
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ModalBackground>
  );
};

export default InventoryEditionModal;
