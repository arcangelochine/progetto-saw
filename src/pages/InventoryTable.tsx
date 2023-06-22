import { ItemTable } from "../components/inventory";
import { Body, Navbar } from "../components/utils";

// Pagina con la lista degli elementi di un inventario
const InventoryTable = () => {
  return (
    <Body>
      <Navbar page="INVENTORY_TABLE" />
      <ItemTable />
    </Body>
  );
};

export default InventoryTable;
