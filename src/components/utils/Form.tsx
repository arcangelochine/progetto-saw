import { styled } from "styled-components";
import { Center, Column, Row } from "./Containers";

export const AuthBody = styled(Center)`
  min-height: 100vh;
  gap: 10px;
`;

export const AuthHeader = styled(Row)`
  align-items: center;
  font-weight: bold;
`;

export const AuthErrorContainer = styled.div`
  background-color: var(--error);
  width: 100%;
  padding: 10px;
  color: var(--bg);
  text-align: center;
`;

export const Form = styled(Center)`
  gap: 24px;
`;

const Label = styled.span`
  font-size: 14px;
`;

const ErrorLabel = styled(Label)`
  position: absolute;
  font-size: 12px;
  align-self: flex-end;
  margin-top: 64px;

  color: var(--error);
`;

const CustomInput = styled.input`
  width: 150px;
  height: 40px;
  padding: 0 10px;

  background-color: var(--bg);
  color: var(--text);
  border: 1px solid var(--text);

  // Mobile: Safari e Chrome fanno uno zoom (fastidioso) della pagina se il font-size dell'input è minore di 16 px
  // https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone
  font-size: 16px;
`;

const InputWithLabelContainer = styled(Column)`
  box-sizing: border-box;
  gap: 4px;
`;

interface InputWithLabelProps {
  label: string;
  type: string;
  length?: number;
  isValid?: boolean;
  errorMessage?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export const InputWithLabel = ({
  label,
  type,
  length,
  isValid = true,
  errorMessage,
  onChange,
  onFocus,
}: InputWithLabelProps) => {
  return (
    <InputWithLabelContainer>
      <Label>{label}</Label>
      <CustomInput
        type={type}
        maxLength={length}
        onChange={onChange}
        onFocus={onFocus}
      />
      {!isValid && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </InputWithLabelContainer>
  );
};
