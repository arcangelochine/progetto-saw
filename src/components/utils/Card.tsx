import { styled } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  border-radius: 10px;

  color: var(--text);
  background-color: var(--secondary);
`;

export const ClickableCard = styled(Card)`
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.6);

  color: var(--bg);
  background-color: var(--primary);
  background: -webkit-linear-gradient(90deg, var(--primary), var(--accent));

  cursor: pointer;

  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.6);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;

export const CardHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid var(--bg);
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 10px;
  width: 100%;

  color: inherit;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 10px;
  width: 100%;

  color: inherit;
`;

export const CardProperty = styled(CardContent)`
  padding: 0;
  gap: 2px;
`;

export const CardErrorLabel = styled.span`
  padding: 4px 6px;
  border-radius: 10px;
  background-color: var(--error);
  font-size: inherit;
  font-weight: inherit;
  text-transform: uppercase;
`;

export const CardCenterContent = styled(CardContent)`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
