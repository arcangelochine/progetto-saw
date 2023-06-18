import { InventoryList } from "../components/inventory";
import {
  Body,
  Content,
  Header,
  Navbar,
  Subtitle,
  Title,
} from "../components/utils";

// Pagina con lista degli inventari
const Inventory = () => {
  return (
    <Body>
      <Navbar page="INVENTORY" />
      <Header>
        <Title>Seleziona un inventario</Title>
      </Header>
      <Content>
        <Subtitle>I tuoi inventari</Subtitle>
        <InventoryList editable />
      </Content>
    </Body>
  );
};

export default Inventory;
