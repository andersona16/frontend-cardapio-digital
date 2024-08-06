import React from "react";

import { ErrorMessage, InputWrapper, Label, StyledInput } from "./styles";

interface InputProps {
  type?: string;
  id?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
}

const InputForm: React.FC<InputProps> = ({
  type = "text",
  id,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  label,
}) => {
  return (
    <InputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default InputForm;
