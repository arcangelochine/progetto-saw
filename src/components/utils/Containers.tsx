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

export const Body = styled(Column)`
  min-height: 100vh;
  padding: 0;
`;

export const Center = styled(Body)`
  justify-content: center;
  align-items: center;
`;

export const Header = styled(Column)`
  padding: 32px;

  border-bottom: 4px dashed var(--secondary);
`;

export const Content = styled(Column)`
  padding: 32px;
  gap: 15px;

  padding-bottom: 100px;
`;

export const IconContainer = styled(FontAwesomeIcon)`
  box-sizing: border-box;
`;
