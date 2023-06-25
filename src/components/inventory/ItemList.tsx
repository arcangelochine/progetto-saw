import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardCenterContent,
  CardContent,
  CardHeader,
  Form,
  IconContainer,
  InputWithLabel,
  PrimaryButton,
  Subtitle,
  Underline,
} from "../utils";
import { InventoryState } from "./ItemTable";
import styled from "styled-components";

import { faAdd, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & div:first-child {
    padding-bottom: 8px;
    border-bottom: 1px solid var(--text);
    font-weight: bold;
  }
`;

const TableGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 2fr 1fr;

  padding: 8px;

  align-items: center;

  @media only screen and (min-width: 1024px) {
    grid-template-columns: 1fr 10fr 1fr;
  }

  &.header > * {
    font-weight: bold;
  }
`;

const TableRow = styled(TableGrid)`
  border-radius: 10px;

  & span:last-child {
    justify-self: end;
  }

  &:hover {
    background-color: var(--secondary-darker);
  }
`;

interface ItemListProps {
  query: string;

  // Lo stato è necessario non solo per mostrare gli elementi, ma anche per modificarli
  inventoryState: InventoryState;
  setInventoryState: React.Dispatch<React.SetStateAction<InventoryState>>;
  setItemId: React.Dispatch<React.SetStateAction<string>>;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemList = ({
  query,
  inventoryState,
  setInventoryState,
  setItemId,
  openModal,
}: ItemListProps) => {
  const [filteredItems, setFilteredItems] = useState(
    inventoryState.inventory.items
  );

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState("");

  const toFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredItems(inventoryState.inventory.filterItemsByName(query));
  }, [query, inventoryState]);

  const addItem: React.FormEventHandler<HTMLFormElement> = (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();

    const _amount = parseInt(amount) || 0;
    const _value = parseFloat(parseFloat(value).toFixed(2)) || 0;

    if (!name.length) return;

    if (_amount < 0) return;

    if (_value < 0) return;

    setInventoryState((state) => ({
      ...state,
      inventory: inventoryState.inventory.addItem(name, _amount, _value),
      edited: true,
    }));

    setName("");
    setAmount("");
    setValue("");

    toFocus.current?.focus();
  };

  return (
    <>
      {filteredItems.length ? (
        <Card>
          <TableContainer>
            <TableGrid className="header">
              <span>id</span>
              <span>Nome</span>
            </TableGrid>

            {filteredItems.map((item) => {
              return (
                <TableRow key={item.uid}>
                  <span>{item.uid}</span>
                  <span>{item.name}</span>
                  <span>
                    <PrimaryButton
                      onClick={() => {
                        setItemId(item.uid);
                        openModal(true);
                      }}
                    >
                      <IconContainer icon={faPenToSquare} />
                    </PrimaryButton>
                  </span>
                </TableRow>
              );
            })}
          </TableContainer>
        </Card>
      ) : (
        <Card>
          <CardCenterContent>
            Sembra che il tuo inventario sia vuoto, prova ad{" "}
            <Underline>aggiungere un oggetto</Underline>
          </CardCenterContent>
        </Card>
      )}
      <Card>
        <CardHeader className="dark">
          <Subtitle>Aggiungi un oggetto</Subtitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={addItem}>
            <InputWithLabel
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={toFocus}
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
            <PrimaryButton type="submit">
              <IconContainer icon={faAdd} />
            </PrimaryButton>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemList;
