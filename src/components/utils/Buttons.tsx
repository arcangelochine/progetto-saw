import { styled } from "styled-components";

const ButtonProps = styled.button`
  white-space: nowrap;

  cursor: pointer;

  transition: transform 0.3s, box-shadow 0.3s;

  font-size: 14px;
  padding: 10px;
  border: none;

  border-radius: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;

export const PrimaryButton = styled(ButtonProps)`
  background-color: var(--primary);
  color: var(--bg);
`;

export const SecondaryButton = styled(ButtonProps)`
  background-color: var(--secondary);
  color: var(--text);
`;

export const DangerButton = styled(ButtonProps)`
  background-color: var(--error);
  color: var(--bg);
`;
