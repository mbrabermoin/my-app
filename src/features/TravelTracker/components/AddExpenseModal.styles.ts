import styled from "styled-components";

export const StyledAddButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(45deg, #ff5252, #ff8c00);
    transform: translateY(-2px);
  }
`;

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const StyledModalContent = styled.div`
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  padding: 30px;
  border-radius: 20px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;

  &::before {
    content: "🌍";
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 2rem;
    opacity: 0.8;
  }
`;

export const StyledModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  color: #4a90e2;
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

export const StyledErrorContainer = styled.div`
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  color: #721c24;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledFieldContainer = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => props.marginBottom || "15px"};
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.hasError ? "#e74c3c" : "#ddd")};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#e74c3c" : "#4ecdc4")};
    box-shadow: 0 0 5px rgba(78, 205, 196, 0.5);
  }
`;

export const StyledErrorText = styled.span`
  color: #e74c3c;
  font-size: 14px;
  font-weight: 500;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const StyledCancelButton = styled.button<{ isLoading?: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) => (props.isLoading ? "#6c757d" : "#5a6268")};
    transform: ${(props) => (props.isLoading ? "none" : "translateY(-2px)")};
  }
`;

export const StyledSubmitButton = styled.button<{
  isValid?: boolean;
  isLoading?: boolean;
}>`
  padding: 12px 24px;
  font-size: 16px;
  background: ${(props) =>
    props.isValid && !props.isLoading
      ? "linear-gradient(45deg, #4ecdc4, #44a08d)"
      : "#ccc"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${(props) =>
    props.isValid && !props.isLoading ? "pointer" : "not-allowed"};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${(props) => {
      if (props.isValid && !props.isLoading)
        return "linear-gradient(45deg, #26d0ce, #3a8f7a)";
      return "#ccc";
    }};
    transform: ${(props) =>
      props.isValid && !props.isLoading ? "translateY(-2px)" : "none"};
  }
`;