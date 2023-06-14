import { Container, LoginForm, LogoAndTitle } from "../components/auth";
import { Footer, Link, Title, Body, Paragraph } from "../components/utils";

// Pagina per il login
const Login = () => {
  return (
    <Body>
      <Container>
        <LogoAndTitle>
          logo
          <Title>
            <Link href="/">iSort</Link>
          </Title>
        </LogoAndTitle>
        <LoginForm />
        <Paragraph>
          Non hai ancora un account? <Link href="/register">Registrati</Link>
        </Paragraph>
      </Container>
      <Footer />
    </Body>
  );
};

export default Login;
