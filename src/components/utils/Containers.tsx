import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0;
`;

export const Center = styled(Column)`
  justify-content: space-between;
  align-items: center;
`;

export const Body = styled(Column)`
  min-height: 100vh;
  padding: 0 20%;

  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const Header = styled(Column)`
  margin-top: 50px;
  padding: 10px;
`;

export const FooterBody = styled(Column)`
  margin-top: auto;
  padding: 10px;

  background-color: var(--text);
  color: var(--bg);
`;
