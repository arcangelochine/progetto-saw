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

// Pagina personale (dashboard)
const Home = () => {
  const user = useContext(AuthContext);

  return (
    <Body>
      <Navbar page="HOME" />
      <Header>
        <Title>
          Bentornato, <Gradient>{user?.displayName}</Gradient>
        </Title>
      </Header>
      <Content>
        <Subtitle>I tuoi inventari</Subtitle>
      </Content>
    </Body>
  );
};

export default Home;
