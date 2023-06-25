import {
  Bold,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardProperty,
  Column,
  IconContainer,
  Paragraph,
  Row,
  Subtitle,
} from "../utils";
import { InventoryState } from "./ItemTable";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DangerButton, PrimaryButton } from "../utils/Buttons";
import styled from "styled-components";

const SummaryWrapper = styled(Row)`
  width: 100%;
  justify-content: space-between;
  gap: 16px;
`;

const PropertyWrapper = styled(Column)`
  gap: 16px;
`;

interface InventorySummaryProps {
  editable?: boolean;
  inventoryState: InventoryState;
  openDeletionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  openEditionModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InventorySummary = ({
  editable = false,
  inventoryState,
  openDeletionModal,
  openEditionModal,
}: InventorySummaryProps) => {
  return (
    <Card>
      <CardHeader className="dark">
        <Subtitle>Riepilogo</Subtitle>
      </CardHeader>
      <CardContent>
        <SummaryWrapper>
          <PropertyWrapper>
            <CardProperty>
              <Bold>Capienza</Bold>
              <Paragraph>
                {inventoryState.inventory.items.length}/
                {inventoryState.inventory.capacity}
              </Paragraph>
            </CardProperty>
            <CardProperty>
              <Bold>Valore</Bold>
              <Paragraph>
                {inventoryState.inventory.value.toFixed(2)} €
              </Paragraph>
            </CardProperty>
            <CardProperty>
              <Bold>Creazione</Bold>
              <Paragraph>
                {inventoryState.inventory.createdAt.toUTCString()}
              </Paragraph>
            </CardProperty>
            <CardProperty>
              <Bold>Ultima modifica</Bold>
              <Paragraph>
                {inventoryState.inventory.updatedAt.toUTCString()}
              </Paragraph>
            </CardProperty>
          </PropertyWrapper>
        </SummaryWrapper>
      </CardContent>
      {editable && (
        <CardFooter>
          <PrimaryButton onClick={() => openEditionModal!(true)}>
            <IconContainer icon={faPenToSquare} />
          </PrimaryButton>
          <DangerButton onClick={() => openDeletionModal!(true)}>
            <IconContainer icon={faTrash} />
          </DangerButton>
        </CardFooter>
      )}
    </Card>
  );
};

export default InventorySummary;
