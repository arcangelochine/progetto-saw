import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Content } from "../utils";
import styled from "styled-components";
import { AuthContext } from "../../core";
import { Inventory } from "../../entities";
import {
  DocumentNotFoundError,
  getInventoryOfUser,
  updateInventory,
} from "../../config/Database";
import { useNavigate, useParams } from "react-router-dom";
import InventorySummary from "./InventorySummary";
import DeletionModal from "./DeletionModal";
import ItemList from "./ItemList";
import EditionModal from "./EditionModal";
import InventoryEditionModal from "./InventoryEditionModal";

const ItemTableContent = styled(Content)`
  padding-top: 182px;
  gap: 32px;
`;

export interface InventoryState {
  inventory: Inventory;
  edited: boolean;
}

const ItemTable = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [deletionModal, setDeletionModal] = useState(false);
  const [editionModal, setEditionModal] = useState(false);
  const [inventoryEditionModal, setInventoryEditionModal] = useState(false);

  const docId = params.id;
  const user = useContext(AuthContext);
  const [itemId, setItemId] = useState("");

  const [inventoryState, setInventoryState] = useState<InventoryState>({
    inventory: new Inventory(null, "", "", [], 0),
    edited: false,
  });

  const [query, setQuery] = useState("");

  // Al momento del rendering, ottengo le informazioni relative all'utente e all'inventario
  useEffect(() => {
    if (user && docId) {
      // Ottengo l'inventario attuale e imposto lo stato
      getInventoryOfUser(user, docId)
        .then((res) => {
          if (res.length) {
            const inventory = res[0].data();

            setInventoryState((state) => ({
              ...state,
              inventory: new Inventory(
                inventory.uid,
                inventory.name,
                inventory.owner,
                inventory.items,
                inventory.capacity,
                inventory.value,
                inventory.createdAt,
                inventory.updatedAt
              ),
            }));
          }
        })
        .catch((err) => {
          switch (err.constructor) {
            case DocumentNotFoundError:
            default:
              navigate("/home");
              break;
          }
        });
    } else navigate("/inventory");
  }, [navigate, user, docId]);

  // Ogni minuto, controllo se lo stato è cambiato. Se così fosse, aggiorno il database
  useEffect(() => {
    if (user && docId) {
      const sendData = setInterval(() => {
        if (inventoryState.edited) {
          updateInventory(user, docId, inventoryState.inventory).then(() => {
            setInventoryState((state) => ({ ...state, edited: false }));
          });
        }
      }, 60000);

      return () => {
        clearInterval(sendData);
      };
    }
  });

  if (!docId) return <></>;

  return (
    <>
      <SearchBar
        query={query}
        setQuery={setQuery}
        docId={docId}
        inventoryState={inventoryState}
        setInventoryState={setInventoryState}
      />
      <ItemTableContent>
        <ItemList
          query={query}
          inventoryState={inventoryState}
          setInventoryState={setInventoryState}
          setItemId={setItemId}
          openModal={setEditionModal}
        />
        <InventorySummary
          inventoryState={inventoryState}
          openDeletionModal={setDeletionModal}
          openEditionModal={setInventoryEditionModal}
        />
      </ItemTableContent>
      {deletionModal && (
        <DeletionModal docId={docId} closeModal={setDeletionModal} />
      )}
      {editionModal && (
        <EditionModal
          itemId={itemId}
          inventoryState={inventoryState}
          setInventoryState={setInventoryState}
          closeModal={setEditionModal}
        />
      )}
      {inventoryEditionModal && (
        <InventoryEditionModal
          inventoryState={inventoryState}
          setInventoryState={setInventoryState}
          closeModal={setInventoryEditionModal}
        />
      )}
    </>
  );
};

export default ItemTable;
