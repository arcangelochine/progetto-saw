import { styled } from "styled-components";
import { Column } from "./Containers";
import { Accent, Link, Paragraph } from "./Typography";

const FooterBody = styled(Column)`
  margin-top: auto;
  padding: 10px;

  background-color: var(--text);
  color: var(--bg);
`;

const Credits = styled(Column)`
  align-items: flex-end;
`;

const Footer = () => {
  return (
    <FooterBody>
      <Credits>
        <Paragraph>
          Ideato e creato da{" "}
          <Link href="https://github.com/arcangelochine">
            <Accent>Arcangelo Chiné</Accent>
          </Link>
        </Paragraph>
      </Credits>
    </FooterBody>
  );
};

export default Footer;
