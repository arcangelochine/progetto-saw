import { styled } from "styled-components";
import { Column } from "./Containers";
import { InputHTMLAttributes } from "react";

export const Form = styled.form`
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  align-items: center;
  padding: 32px;
  border-radius: 10px;
`;

export const AuthErrorContainer = styled.div`
  background-color: var(--error);
  width: 100%;
  padding: 8px;
  color: var(--bg);
  text-align: center;
  border-radius: 10px;
`;

const Label = styled.span`
  font-size: 16px;
`;

const ErrorLabel = styled(Label)`
  position: absolute;
  font-size: 12px;
  align-self: flex-end;
  margin-top: 64px;

  color: var(--error);
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 8px;
  color: var(--text);
  border: none;
  border-radius: 10px;

  // Mobile: Safari e Chrome fanno uno zoom (fastidioso) della pagina se il font-size dell'input è minore di 16 px
  // https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone
  font-size: 16px;
`;

const InputWithLabelContainer = styled(Column)`
  box-sizing: border-box;
  gap: 4px;
  width: 100%;
`;

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isValid?: boolean;
  errorMessage?: string;
}

export const InputWithLabel = ({
  label,
  isValid,
  errorMessage,
  ...inputProps
}: InputWithLabelProps) => {
  return (
    <InputWithLabelContainer>
      {!!label && <Label>{label}</Label>}
      <CustomInput {...inputProps} />
      {!isValid && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </InputWithLabelContainer>
  );
};
