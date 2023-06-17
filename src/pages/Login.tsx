import { LoginForm } from "../components/auth";
import {
  Link,
  Body,
  Paragraph,
  Accent,
  Content,
  Navbar,
} from "../components/utils";

// Pagina per il login
const Login = () => {
  return (
    <Body>
      <Navbar page="AUTH" />
      <Content>
        <LoginForm />
        <Paragraph>
          Non hai ancora un account?{" "}
          <Link href="/register">
            <Accent>Registrati</Accent>
          </Link>
        </Paragraph>
      </Content>
    </Body>
  );
};

export default Login;
