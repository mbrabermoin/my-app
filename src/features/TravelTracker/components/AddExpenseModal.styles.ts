import styled from "styled-components";

const terracotta = "#c4714a";
const deep = "#1a1410";
const warmBrown = "#6b4226";
const cream = "#fdf6ec";
const muted = "#9c8b79";
const sand = "#f5ede0";

export const StyledAddButton = styled.button`
  padding: 11px 22px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  background: ${terracotta};
  color: white;
  cursor: pointer;
  transition: all 0.18s;
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.4px;

  &:hover {
    background: #b05e39;
    border-color: rgba(255, 255, 255, 0.22);
    color: white;
    box-shadow: 0 8px 24px rgba(196, 113, 74, 0.35);
    transform: translateY(-1px);
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
  z-index: 9999;
  backdrop-filter: blur(4px);
  padding: 16px;
`;

export const StyledModalContent = styled.div`
  background: ${cream};
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 30px;
  border-radius: 20px;
  width: 480px;
  max-width: 90%;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.28);
  position: relative;
  color: ${deep};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    pointer-events: none;
    background: radial-gradient(circle at top right, rgba(196, 113, 74, 0.12), transparent 60%);
  }
`;

export const StyledModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 22px;
  color: ${deep};
  font-size: 1.8rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: -0.4px;
`;

export const StyledErrorContainer = styled.div`
  background: #fff2ee;
  color: #9b2f18;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid rgba(196, 113, 74, 0.36);
`;

export const StyledFieldContainer = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => props.marginBottom || "15px"};
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: ${muted};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1.5px solid ${(props) => (props.hasError ? "rgba(196, 113, 74, 0.7)" : "rgba(0, 0, 0, 0.12)")};
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
  background: white;
  color: ${deep};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "rgba(196, 113, 74, 0.72)" : terracotta)};
    box-shadow: 0 0 0 3px rgba(196, 113, 74, 0.15);
  }

  &::placeholder {
    color: ${muted};
  }
`;

export const StyledErrorText = styled.span`
  color: #9b2f18;
  font-size: 13px;
  font-weight: 500;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const StyledCancelButton = styled.button<{ isLoading?: boolean }>`
  padding: 11px 22px;
  font-size: 14px;
  background: transparent;
  color: ${warmBrown};
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    border-color: ${(props) => (props.isLoading ? "rgba(0, 0, 0, 0.15)" : terracotta)};
    background: ${(props) =>
      props.isLoading
        ? "transparent"
        : "rgba(196, 113, 74, 0.06)"};
    transform: ${(props) => (props.isLoading ? "none" : "translateY(-2px)")};
  }
`;

export const StyledSubmitButton = styled.button<{
  isValid?: boolean;
  isLoading?: boolean;
}>`
  padding: 11px 28px;
  font-size: 14px;
  background: ${(props) =>
    props.isValid && !props.isLoading
      ? terracotta
      : sand};
  color: ${(props) => (props.isValid && !props.isLoading ? "white" : muted)};
  border: 1px solid
    ${(props) =>
      props.isValid && !props.isLoading
        ? terracotta
        : "rgba(0, 0, 0, 0.08)"};
  border-radius: 50px;
  cursor: ${(props) =>
    props.isValid && !props.isLoading ? "pointer" : "not-allowed"};
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    background: ${(props) => {
      if (props.isValid && !props.isLoading)
        return "#b05e39";
      return sand;
    }};
    border-color: ${(props) =>
      props.isValid && !props.isLoading
        ? "#b05e39"
        : "rgba(0, 0, 0, 0.08)"};
    transform: ${(props) =>
      props.isValid && !props.isLoading ? "translateY(-2px)" : "none"};
  }
`;