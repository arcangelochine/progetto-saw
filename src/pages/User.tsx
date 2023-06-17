import { useContext } from "react";
import {
  Body,
  Content,
  Header,
  Navbar,
  Paragraph,
  Title,
} from "../components/utils";
import { AuthContext } from "../core";

// Pagina per gestire un utente
const User = () => {
  const user = useContext(AuthContext);

  return (
    <Body>
      <Navbar page="EDIT" />
      <Header>
        <Title>Modifica il tuo account</Title>
      </Header>
      <Content>
        <Paragraph>{user?.displayName}</Paragraph>
      </Content>
    </Body>
  );
};

export default User;
