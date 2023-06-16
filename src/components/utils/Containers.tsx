import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const Header = styled(Column)`
  margin-top: 50px;
  padding: 10px;
`;

export const IconContainer = styled(FontAwesomeIcon)`
  display: inline-block;
`;
