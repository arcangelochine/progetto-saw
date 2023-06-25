import styled from "styled-components";
import {
  Body,
  Card,
  CardCenterContent,
  Content,
  Header,
  IconContainer,
  Navbar,
  Paragraph,
  Subtitle,
  Title,
} from "../components/utils";

import {
  faBoxArchive,
  faListDots,
  faStopwatch,
  faPhone,
  faMagnifyingGlassChart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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

// Pagina che illustra le feature per gli utenti premium (https://www.youtube.com/watch?v=x38oP8TMdKM)
const Pro = () => {
  return (
    <Body>
      <Navbar page="PRO" />
      <Header>
        <Title>Passa a premium</Title>
      </Header>
      <Content>
        <Subtitle>Più inventari, più oggetti, meno attese</Subtitle>
        <FeaturesContainer>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faBoxArchive} />
              </Title>
              <Paragraph>Gestisci 5 inventari in più</Paragraph>
            </CardCenterContent>
          </Card>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faListDots} />
              </Title>
              <Paragraph>Fino a 5000 oggetti per inventario</Paragraph>
            </CardCenterContent>
          </Card>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faStopwatch} />
              </Title>
              <Paragraph>Salvataggio automatico più rapido del 50%</Paragraph>
            </CardCenterContent>
          </Card>
        </FeaturesContainer>
        <Subtitle>Più attenzioni</Subtitle>
        <FeaturesContainer>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faPhone} />
              </Title>
              <Paragraph>Supporto gratuito 24/7</Paragraph>
            </CardCenterContent>
          </Card>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faMagnifyingGlassChart} />
              </Title>
              <Paragraph>Infografica più approfondita</Paragraph>
            </CardCenterContent>
          </Card>
          <Card>
            <CardCenterContent>
              <Title>
                <IconContainer icon={faUsers} />
              </Title>
              <Paragraph>
                Account aziendali per gestire lo stesso inventario in contemporanea
              </Paragraph>
            </CardCenterContent>
          </Card>
        </FeaturesContainer>
      </Content>
    </Body>
  );
};

export default Pro;
