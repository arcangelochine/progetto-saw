import { ItemTable } from "../components/inventory";
import { Body, Navbar } from "../components/utils";

// Pagina con lista degli inventari
const InventoryTable = () => {
  return (
    <Body>
      <Navbar page="INVENTORY_TABLE" />
      <ItemTable />
    </Body>
  );
};

export default InventoryTable;
