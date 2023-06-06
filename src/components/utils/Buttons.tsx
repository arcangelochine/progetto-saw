import { styled } from "styled-components";

const ButtonProps = styled.button`
  white-space: nowrap;

  cursor: pointer;

  transition: transform 0.3s, box-shadow 0.3s;

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
  background-color: #99d1d6;
  color: #103003;
`;

export const SecondaryButton = styled(ButtonProps)`
  background-color: #dbe5fb;
  color: #103003;
`;
