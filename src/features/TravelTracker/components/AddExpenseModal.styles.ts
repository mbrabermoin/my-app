import styled from "styled-components";

export const StyledAddButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background: linear-gradient(180deg, rgba(78, 205, 196, 0.26), rgba(78, 205, 196, 0.14));
  color: #f4f7fb;
  border: 1px solid rgba(78, 205, 196, 0.52);
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    border-color: rgba(133, 240, 232, 0.8);
    background: linear-gradient(180deg, rgba(78, 205, 196, 0.36), rgba(78, 205, 196, 0.2));
    transform: translateY(-2px);
  }
`;

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 7, 12, 0.72);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

export const StyledModalContent = styled.div`
  background: rgba(8, 14, 26, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 30px;
  border-radius: 20px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    pointer-events: none;
    background: radial-gradient(circle at top right, rgba(78, 205, 196, 0.14), transparent 52%);
  }
`;

export const StyledModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  color: #f4f7fb;
  font-size: 1.8rem;
`;

export const StyledErrorContainer = styled.div`
  background: rgba(220, 53, 69, 0.12);
  color: #ff9ea7;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid rgba(220, 53, 69, 0.42);
`;

export const StyledFieldContainer = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => props.marginBottom || "15px"};
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: rgba(244, 247, 251, 0.86);
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.hasError ? "rgba(220, 53, 69, 0.8)" : "rgba(255, 255, 255, 0.2)")};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
  background: rgba(255, 255, 255, 0.05);
  color: #f4f7fb;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "rgba(220, 53, 69, 0.8)" : "rgba(78, 205, 196, 0.72)")};
    box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.2);
  }
`;

export const StyledErrorText = styled.span`
  color: #ff9ea7;
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
  background: rgba(255, 255, 255, 0.06);
  color: #f4f7fb;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    border-color: ${(props) => (props.isLoading ? "rgba(255, 255, 255, 0.16)" : "rgba(78, 205, 196, 0.42)")};
    background: ${(props) =>
      props.isLoading
        ? "rgba(255, 255, 255, 0.06)"
        : "linear-gradient(180deg, rgba(78, 205, 196, 0.14), rgba(255, 255, 255, 0.05))"};
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
      ? "linear-gradient(180deg, rgba(78, 205, 196, 0.32), rgba(78, 205, 196, 0.2))"
      : "rgba(255, 255, 255, 0.08)"};
  color: ${(props) => (props.isValid && !props.isLoading ? "#f4f7fb" : "rgba(244, 247, 251, 0.4)")};
  border: 1px solid
    ${(props) =>
      props.isValid && !props.isLoading
        ? "rgba(78, 205, 196, 0.62)"
        : "rgba(255, 255, 255, 0.12)"};
  border-radius: 999px;
  cursor: ${(props) =>
    props.isValid && !props.isLoading ? "pointer" : "not-allowed"};
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    background: ${(props) => {
      if (props.isValid && !props.isLoading)
        return "linear-gradient(180deg, rgba(78, 205, 196, 0.46), rgba(78, 205, 196, 0.26))";
      return "rgba(255, 255, 255, 0.08)";
    }};
    border-color: ${(props) =>
      props.isValid && !props.isLoading
        ? "rgba(133, 240, 232, 0.82)"
        : "rgba(255, 255, 255, 0.12)"};
    transform: ${(props) =>
      props.isValid && !props.isLoading ? "translateY(-2px)" : "none"};
  }
`;