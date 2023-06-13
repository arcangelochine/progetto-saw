import { styled } from "styled-components";
import { Column } from "./Containers";
import { PrimaryButton } from "./Buttons";

export const AuthErrorContainer = styled.div`
  background-color: var(--error);
  width: 100%;
  padding: 10px;
  color: var(--bg);
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap:24px;
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

export const InputButton = styled(PrimaryButton)`
  margin-top: 10px;
  width: 150px;
  height: 40px;
`;

const InputWithLabelContainer = styled(Column)`
  box-sizing: border-box;
  gap: 4px;
`;

interface InputWithLabelProps {
  label?: string;
  type: string;
  value: string;
  length?: number;
  isValid?: boolean;
  errorMessage?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export const InputWithLabel = ({
  label,
  type,
  value,
  length,
  isValid = true,
  errorMessage,
  onChange,
  onFocus,
}: InputWithLabelProps) => {
  return (
    <InputWithLabelContainer>
      {!!label && <Label>{label}</Label>}
      <CustomInput
        type={type}
        maxLength={length}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        required
      />
      {!isValid && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </InputWithLabelContainer>
  );
};
