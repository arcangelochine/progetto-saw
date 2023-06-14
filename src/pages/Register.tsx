import { Container, LogoAndTitle, RegisterForm } from "../components/auth";
import { Body, Footer, Link, Paragraph, Title } from "../components/utils";

// Pagina per registrarsi
const Register = () => {
  return (
    <Body>
      <Container>
        <LogoAndTitle>
          logo
          <Title>
            <Link href="/">iSort</Link>
          </Title>
        </LogoAndTitle>
        <RegisterForm />
        <Paragraph>
          Hai già un account? <Link href="/login">Accedi</Link>
        </Paragraph>
      </Container>
      <Footer />
    </Body>
  );
};

export default Register;
