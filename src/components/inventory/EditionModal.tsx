import { useState } from "react";
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
import { InventoryState } from "./ItemTable";
import { DangerButton } from "../utils/Buttons";

interface EditionModalProps {
  itemId: string;
  inventoryState: InventoryState;
  setInventoryState: React.Dispatch<React.SetStateAction<InventoryState>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditionModal = ({
  itemId,
  inventoryState,
  setInventoryState,
  closeModal,
}: EditionModalProps) => {
  const inventory = inventoryState.inventory;
  const item = inventory.filterItemsByUID(itemId)[0];

  const [name, setName] = useState(item.name);
  const [amount, setAmount] = useState(item.amount.toString());
  const [value, setValue] = useState(item.value.toFixed(2));

  const editItem: React.FormEventHandler<HTMLFormElement> = (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();

    // Nessuna modifica
    if (
      name === item.name &&
      amount === item.amount.toString() &&
      value === item.value.toFixed(2)
    ) {
      closeModal(false);
      return;
    }

    const _amount = parseInt(amount) || 0;
    const _value = parseFloat(parseFloat(value).toFixed(2)) || 0;

    if (!name.length) return;

    if (_amount < 0) return;

    if (_value < 0) return;

    setInventoryState((state) => ({
      ...state,
      inventory: inventory.editItem(itemId, name, _amount, _value),
      edited: true,
    }));

    closeModal(false);
  };

  const deleteItem: React.MouseEventHandler<HTMLButtonElement> = (
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();

    setInventoryState((state) => ({
      ...state,
      inventory: inventory.deleteItem(itemId),
      edited: true,
    }));

    closeModal(false);
  };

  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <Subtitle>Modifica l'oggetto</Subtitle>
        </ModalHeader>
        <ModalContent>
          <Form onSubmit={editItem}>
            <InputWithLabel
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputWithLabel
              label="Quantità"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <InputWithLabel
              label="Valore (€)"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <PrimaryButton type="submit">Modifica</PrimaryButton>
          </Form>
        </ModalContent>
        <ModalFooter>
          <PrimaryButton onClick={() => closeModal(false)}>
            Annulla
          </PrimaryButton>
          <DangerButton onClick={deleteItem}>Elimina</DangerButton>
        </ModalFooter>
      </Modal>
    </ModalBackground>
  );
};

export default EditionModal;
