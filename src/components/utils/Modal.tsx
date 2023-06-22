import styled from "styled-components";
import { CustomInput } from "./Form";
import { Card } from "./Card";

export const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 32px;

  z-index: 50;
`;

export const Modal = styled(Card)`
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ModalHeader = styled.div``;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  justify-content: center;
  align-items: center;
`;

export const KeywordInput = styled(CustomInput)`
  width: 50%;
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;
