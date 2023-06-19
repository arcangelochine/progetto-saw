import { useContext } from "react";
import {
  Body,
  Content,
  Gradient,
  Header,
  Navbar,
  Subtitle,
  Title,
} from "../components/utils";
import { AuthContext } from "../core";
import { InventoryList } from "../components/inventory";

// Pagina personale (dashboard)
const Home = () => {
  const user = useContext(AuthContext);

  return (
    <Body>
      <Navbar page="HOME" />
      <Header>
        <Title>
          {user?.displayName ? (
            <>
              Bentornato, <Gradient>{user.displayName}</Gradient>
            </>
          ) : (
            <>Benvenuto</>
          )}
        </Title>
      </Header>
      <Content>
        <Subtitle>I tuoi inventari</Subtitle>
        <InventoryList editable expandable />
      </Content>
    </Body>
  );
};

export default Home;
