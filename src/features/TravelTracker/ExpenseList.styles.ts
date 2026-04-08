import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
`;

export const StyledHeader = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
`;

export const StyledButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBackButton = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }
`;

export const StyledSyncButton = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #6b7aff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgb(82, 114, 255);
    transform: translateY(-2px);
  }
`;

export const StyledExpenseTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

export const StyledTableHeader = styled.th`
  padding: 15px;
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(78, 205, 196, 0.1);
  }

  &:hover {
    background: rgba(78, 205, 196, 0.2);
    transform: scale(1.01);
    transition: all 0.2s ease;
  }
`;

export const StyledTableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #333;
  font-weight: 500;

  &:first-child {
    font-weight: bold;
    color: #4a90e2;
  }

  &:nth-child(2) {
    color: #ff6b6b;
    font-weight: bold;
  }
`;

export const StyledMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: #333;
  font-size: 1.2rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

export const StyledPaginationContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const StyledPaginationButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#4ecdc4")};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#26d0ce")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
  }
    display: none; // Hidden by default, will be shown when there are expenses to paginate
`;

export const StyledPaginationInfo = styled.span`
  margin: 0 15px;
  color: #fff;
  font-weight: bold;
`;