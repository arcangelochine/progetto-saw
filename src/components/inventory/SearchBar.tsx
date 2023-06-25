import styled from "styled-components";
import { IconContainer, PrimaryButton, Subtitle } from "../utils";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { InventoryState } from "./ItemTable";
import { useContext, useState } from "react";
import { updateInventory } from "../../config/Database";
import { AuthContext } from "../../core";

const SearchBarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;

  background-color: var(--secondary);

  z-index: 25;
`;

const SearchBarRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
`;

const TitleContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

const QueryInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 8px;
  color: var(--text);
  border: none;
  border-radius: 10px;
`;

const SearchBarButton = styled(PrimaryButton)`
  &.edited::before {
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    width: 10px;
    height: 10px;
    background-color: var(--error);
    border-radius: 50%;
  }

  &:disabled {
    filter: saturate(0);
  }
`;

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;

  // Lo stato dell'inventario è necessario per aggiornare l'inventario
  docId: string;
  inventoryState: InventoryState;
  setInventoryState: React.Dispatch<React.SetStateAction<InventoryState>>;
}

const SearchBar = ({
  query,
  setQuery,
  docId,
  inventoryState,
  setInventoryState,
}: SearchBarProps) => {
  const user = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);

  const handleSave = () => {
    if (user && docId) {
      if (inventoryState.edited) {
        setDisabled(true);

        setTimeout(() => {
          setDisabled(false);
        }, 60000);

        updateInventory(user, docId, inventoryState.inventory).then(() => {
          setInventoryState((state) => ({ ...state, edited: false }));
        });
      }
    }
  };

  return (
    <SearchBarContainer>
      <TitleContainer>
        <Subtitle>{inventoryState.inventory.name}</Subtitle>
      </TitleContainer>
      <SearchBarRow>
        <QueryInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cerca..."
        />
        <SearchBarButton
          className={`${inventoryState.edited && "edited"}`}
          disabled={disabled}
          onClick={handleSave}
        >
          <IconContainer icon={faFloppyDisk} />
        </SearchBarButton>
      </SearchBarRow>
    </SearchBarContainer>
  );
};

export default SearchBar;
