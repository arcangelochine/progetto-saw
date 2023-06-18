import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../core";
import { styled } from "styled-components";
import { Inventory } from "../../entities";
import {
  Bold,
  CardContent,
  CardFooter,
  CardHeader,
  CardProperty,
  ClickableCard,
  IconContainer,
  Link,
  Paragraph,
  Subtitle,
} from "../utils";
import { getInventoriesOfUser } from "../../config/Database";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
          <IconContainer icon={faPenToSquare} style={{ fontSize: "25px" }} />
        </CardFooter>
      )}
    </ClickableCard>
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
  const [inventories, setInventories] = useState<Inventory[]>(
    new Array<Inventory>()
  );

  useEffect(() => {
    if (user)
      getInventoriesOfUser(user).then((res) => {
        setInventories(res);
      });
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
      </ListContainer>
    );

  return <></>;
};

export default InventoryList;
