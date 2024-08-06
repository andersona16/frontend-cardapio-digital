import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;

  padding: 0px 5px;
`;

export const StyledInput = styled.input<{ error?: string }>`
  padding: 10px;
  border: 1px solid ${({ error }) => (error ? "#ff5c5c" : "#ccc")};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ error }) => (error ? "#ff5c5c" : "#007bff")};
  }
`;

export const ErrorMessage = styled.span`
  color: #ff5c5c;
  font-size: 12px;
  margin-top: 5px;
`;
