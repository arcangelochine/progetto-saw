import { Body, Content, Navbar } from "../components/utils";

// Pagina con lista degli inventari
const InventoryTable = () => {
  return (
    <Body>
      <Navbar page="INVENTORY_TABLE" />
      <Content></Content>
    </Body>
  );
};

export default InventoryTable;
