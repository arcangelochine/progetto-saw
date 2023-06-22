import { styled } from "styled-components";

const FluidContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const Card = styled(FluidContainer)`
  padding: 32px;
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

export const CardHeader = styled(FluidContainer)`
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--bg);
`;

export const CardContent = styled(FluidContainer)`
  gap: 16px;
`;

export const CardFooter = styled(FluidContainer)`
  margin-top: 16px;
  align-items: flex-end;
`;

export const CardProperty = styled(FluidContainer)`
  padding: 0;
  gap: 4px;
`;

export const CardCenterContent = styled(CardContent)`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
