import styled from "styled-components";
import {
  Accent,
  Body,
  Card,
  CardCenterContent,
  Content,
  Header,
  IconContainer,
  Navbar,
  Paragraph,
  PrimaryButton,
  Title,
} from "../components/utils";

import {
  faBoxArchive,
  faFileExcel,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  & > * {
    flex: 1;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

// Pagina per gli ospiti
const Landing = () => {
  const navigate = useNavigate();

  return (
    <Body>
      <Navbar page="HOME" />
      <Header>
        <Title>iSort</Title>
      </Header>
      <Content>
        <FeaturesContainer>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faBoxArchive} />
              </Title>
              <Paragraph>Gestisci i tuoi inventari</Paragraph>
            </CardCenterContent>
          </Card>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faFileExcel} />
              </Title>
              <Paragraph>Esporta o importa le tue tabelle da Excel</Paragraph>
              <Accent>(prossimamente)</Accent>
            </CardCenterContent>
          </Card>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faStopwatch} />
              </Title>
              <Paragraph>
                Salvataggio automatico per garantire l'integrità dei tuoi dati
              </Paragraph>
            </CardCenterContent>
          </Card>
        </FeaturesContainer>

        <PrimaryButton onClick={() => navigate("/register")}>
          Inizia adesso
        </PrimaryButton>
      </Content>
    </Body>
  );
};

export default Landing;
