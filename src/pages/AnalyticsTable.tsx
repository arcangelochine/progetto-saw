import {
  Body,
  Content,
  Header,
  Navbar,
  Subtitle,
  Title,
} from "../components/utils";

// Pagina con lista degli inventari
const AnalyticsTable = () => {
  return (
    <Body>
      <Navbar page="ANALYTICS" />
      <Header>
        <Title>nome_inventario</Title>
        <Subtitle>xxx/1000</Subtitle>
        <Subtitle>xxxx.xx €</Subtitle>
      </Header>
      <Content></Content>
    </Body>
  );
};

export default AnalyticsTable;
