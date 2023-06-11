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
  justify-content: center;
  align-items: center;
`;
