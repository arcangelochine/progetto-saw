import { Body, Content, Header, Navbar, Title } from "../components/utils";

// Pagina con lista degli inventari
const Analytics = () => {
  return (
    <Body>
      <Navbar page="ANALYTICS" />
      <Header>
        <Title>Seleziona un inventario</Title>
      </Header>
      <Content></Content>
    </Body>
  );
};

export default Analytics;
