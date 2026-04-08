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
`;

export const StyledButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBackButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledUserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

export const StyledTableHeader = styled.th`
  padding: 15px;
  text-align: left;
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export const StyledTableRow = styled.tr`
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.01);
  }
`;

export const StyledTableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StyledMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
  background: ${(props) =>
    props.disabled
      ? "rgba(255, 255, 255, 0.3)"
      : "linear-gradient(45deg, #4facfe, #00f2fe)"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 6px 20px rgba(0, 0, 0, 0.3)"};
  }
`;

export const StyledPaginationInfo = styled.span`
  margin: 0 15px;
  font-weight: bold;
  color: #fff;
`;
