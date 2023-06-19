import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../core";
import { styled } from "styled-components";
import { Inventory } from "../../entities";
import {
  Bold,
  Card,
  CardCenterContent,
  CardContent,
  CardFooter,
  CardHeader,
  CardProperty,
  ClickableCard,
  IconContainer,
  Link,
  Paragraph,
  Subtitle,
  Underline,
} from "../utils";
import {
  createInventory,
  getInventoriesOfUser,
  isPremium,
} from "../../config/Database";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

interface InventoryCardProps {
  inventory: Inventory;
  editable?: boolean;
}

const InventoryCard = ({ inventory, editable = false }: InventoryCardProps) => {
  return (
    <ClickableCard>
      <CardHeader>
        <Subtitle>{inventory.name}</Subtitle>
      </CardHeader>
      <CardContent>
        <CardProperty>
          <Bold>Capienza</Bold>
          <Paragraph>
            {inventory.items.length}/{inventory.capacity}
          </Paragraph>
        </CardProperty>
        <CardProperty>
          <Bold>Valore</Bold>
          <Paragraph>{inventory.computeValue()} €</Paragraph>
        </CardProperty>
      </CardContent>
      {editable && (
        <CardFooter>
          <Subtitle>
            <IconContainer icon={faPenToSquare} />
          </Subtitle>
        </CardFooter>
      )}
    </ClickableCard>
  );
};

interface InventoryExpansionProps {
  premium: boolean;
  inventories: number;
}

const InventoryExpansion = ({
  premium,
  inventories,
}: InventoryExpansionProps) => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  // Gli utenti premium hanno diritto a gestire 10 inventari piuttosto che 5
  const maxLength = premium ? 10 : 5;

  const createInventoryAndNavigate = async () => {
    if (user === null) return;

    if (loading) return;

    setLoading(true);

    createInventory(user)
      .then((res) => {
        if (res) {
          navigate(`/inventory/${res.id}`);
          return;
        }

        // TO-DO catch errors
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (inventories < maxLength) {
    // card che punta a un nuovo inventario
    return (
      <ClickableCard onClick={() => createInventoryAndNavigate()}>
        <CardCenterContent>
          <Paragraph>Aggiungi un inventario</Paragraph>
          <IconContainer icon={faPlus} />
        </CardCenterContent>
      </ClickableCard>
    );
  }

  // Se l'utente ha raggiunto il numero massimo di inventari, viene mostrato un avviso
  return (
    <Card>
      <CardCenterContent>
        <Paragraph>
          Hai raggiunto il numero massimo di inventari che puoi gestire
        </Paragraph>
        <Paragraph>
          Scopri le funzionalità{" "}
          <Link href="pro">
            <Underline>premium</Underline>
          </Link>
        </Paragraph>
      </CardCenterContent>
    </Card>
  );
};

interface InventoryListProps {
  editable?: boolean;
  expandable?: boolean;
}

const InventoryList = ({
  editable = false,
  expandable = false,
}: InventoryListProps) => {
  const user = useContext(AuthContext);
  const [inventories, setInventories] = useState<Array<Inventory>>(
    new Array<Inventory>()
  );
  const [premium, setPremium] = useState(false);

  // Quando questa componente viene renderizzata, viene fatta una richiesta al database
  useEffect(() => {
    if (user) {
      getInventoriesOfUser(user).then((res) => {
        setInventories(res);
      });
      isPremium(user).then((res) => {
        setPremium(res);
      });
    }
  }, [user]);

  if (user)
    return (
      <ListContainer>
        {inventories.map((inventory, index) => {
          return (
            <Link key={index} href={`inventory/${inventory.uid}`}>
              <InventoryCard inventory={inventory} editable={editable} />
            </Link>
          );
        })}

        {expandable && (
          <InventoryExpansion
            premium={premium}
            inventories={inventories.length}
          />
        )}
      </ListContainer>
    );

  return <></>;
};

export default InventoryList;
