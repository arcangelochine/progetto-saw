import { RegisterForm } from "../components/auth";
import {
  Accent,
  Body,
  Content,
  Footer,
  Link,
  Navbar,
  Paragraph,
} from "../components/utils";

// Pagina per registrarsi
const Register = () => {
  return (
    <Body>
      <Navbar page="AUTH" />
      <Content>
        <RegisterForm />
        <Paragraph>
          Hai già un account?{" "}
          <Link href="/login">
            <Accent>Accedi</Accent>
          </Link>
        </Paragraph>
      </Content>
      <Footer />
    </Body>
  );
};

export default Register;
