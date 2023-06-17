import { Body, Header, Navbar, Title } from "../components/utils";

// Pagina con lista degli inventari
const Inventory = () => {
  return (
    <Body>
      <Navbar page="INVENTORY" />
      <Header>
        <Title>Seleziona un inventario</Title>
      </Header>
    </Body>
  );
};

export default Inventory;
