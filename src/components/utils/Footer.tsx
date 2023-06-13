import { styled } from "styled-components";
import { FooterBody, Column } from "./Containers";
import { Link, Paragraph } from "./Typography";

const Credits = styled(Column)`
  align-items: flex-end;
`;

const Footer = () => {
  return (
    <FooterBody>
      <Credits>
        <Paragraph>
          Made by{" "}
          <Link href="https://github.com/arcangelochine">Arcangelo Chiné</Link>
        </Paragraph>
      </Credits>
    </FooterBody>
  );
};

export default Footer;
