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
const Analytics = () => {
  return (
    <Body>
      <Navbar page="ANALYTICS" />
      <Header>
        <Title>Seleziona un inventario</Title>
      </Header>
      <Content>
        <Subtitle>I tuoi inventari</Subtitle>
        <InventoryList analytics />
      </Content>
    </Body>
  );
};

export default Analytics;
