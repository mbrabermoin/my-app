import styled from "styled-components";

export const StyledAddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const StyledModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`;

export const StyledModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`;

export const StyledErrorContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
`;

export const StyledFieldContainer = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => props.marginBottom || "15px"};
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.hasError ? "#e74c3c" : "#ccc")};
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#e74c3c" : "#007bff")};
  }
`;

export const StyledErrorText = styled.span`
  color: #e74c3c;
  font-size: 14px;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const StyledCancelButton = styled.button<{ isLoading?: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.isLoading ? "#6c757d" : "#5a6268")};
  }
`;

export const StyledSubmitButton = styled.button<{
  isValid?: boolean;
  isLoading?: boolean;
}>`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) =>
    props.isValid && !props.isLoading ? "#4CAF50" : "#ccc"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) =>
    props.isValid && !props.isLoading ? "pointer" : "not-allowed"};

  &:hover {
    background-color: ${(props) => {
      if (props.isValid && !props.isLoading) return "#45a049";
      return props.isValid && !props.isLoading ? "#4CAF50" : "#ccc";
    }};
  }
`;
