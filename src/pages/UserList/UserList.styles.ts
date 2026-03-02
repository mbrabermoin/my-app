import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 20px;
`;

export const StyledHeader = styled.h1`
  margin-bottom: 20px;
`;

export const StyledButtonContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledBackButton = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export const StyledUserGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export const StyledUserCard = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const StyledMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;

export const StyledPaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const StyledPaginationButton = styled.button<{ disabled: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

export const StyledPaginationInfo = styled.span`
  margin: 0 10px;
`;
