import styled from "styled-components";

export const StyledContainer = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  background: rgba(8, 14, 26, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
  min-height: 100vh;
  color: #f4f7fb;

  @media (max-width: 640px) {
    padding: 24px;
  }
`;

export const StyledHeader = styled.h1`
  margin: 0 0 20px;
  text-align: left;
  font-size: clamp(2rem, 4vw, 3.1rem);
  line-height: 1.1;
  color: #f4f7fb;
`;

export const StyledButtonContainer = styled.div`
  margin-bottom: 22px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const StyledBackButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  color: #f4f7fb;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    border-color: rgba(78, 205, 196, 0.52);
    background: linear-gradient(180deg, rgba(78, 205, 196, 0.16), rgba(255, 255, 255, 0.05));
    transform: translateY(-2px);
  }
`;

export const StyledSyncButton = styled.button`
  padding: 10px 20px;
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

export const StyledTripFilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledFilterLabel = styled.span`
  color: rgba(244, 247, 251, 0.58);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const StyledTripFilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid
    ${(props) => (props.$active ? "rgba(78, 205, 196, 0.62)" : "rgba(255, 255, 255, 0.18)")};
  border-radius: 999px;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(180deg, rgba(78, 205, 196, 0.26), rgba(78, 205, 196, 0.14))"
      : "linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))"};
  color: ${(props) => (props.$active ? "#f4f7fb" : "rgba(244, 247, 251, 0.86)")};
  cursor: pointer;
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(78, 205, 196, 0.52);
    background: linear-gradient(180deg, rgba(78, 205, 196, 0.16), rgba(255, 255, 255, 0.05));
  }
`;

export const StyledSummary = styled.div`
  margin: 0 0 18px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StyledSummaryItem = styled.span`
  color: rgba(244, 247, 251, 0.78);
  font-size: 0.98rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const StyledSummaryValue = styled.strong`
  color: #f4f7fb;
  font-weight: 700;
`;

export const StyledExpenseTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(8, 14, 26, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(10px);
`;

export const StyledTableHeader = styled.th`
  padding: 15px;
  background: rgba(78, 205, 196, 0.12);
  color: #85f0e8;
  font-weight: 700;
  font-size: 1rem;
  text-align: left;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.03);
  }

  &:hover {
    background: rgba(78, 205, 196, 0.12);
    transition: background 0.2s ease;
  }
`;

export const StyledTableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(244, 247, 251, 0.92);
  font-weight: 500;

  &:first-child {
    font-weight: bold;
    color: #85f0e8;
  }

  &:nth-child(2) {
    color: #f4f7fb;
    font-weight: bold;
  }
`;

export const StyledMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: rgba(244, 247, 251, 0.78);
  font-size: 1.2rem;
  border-radius: 12px;
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
  background: ${(props) =>
    props.disabled
      ? "rgba(255, 255, 255, 0.05)"
      : "linear-gradient(180deg, rgba(78, 205, 196, 0.26), rgba(78, 205, 196, 0.14))"};
  color: ${(props) => (props.disabled ? "rgba(244, 247, 251, 0.38)" : "#f4f7fb")};
  border: 1px solid
    ${(props) => (props.disabled ? "rgba(255, 255, 255, 0.08)" : "rgba(78, 205, 196, 0.52)")};
  border-radius: 999px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? "rgba(255, 255, 255, 0.05)"
        : "linear-gradient(180deg, rgba(78, 205, 196, 0.36), rgba(78, 205, 196, 0.2))"};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
  }
`;

export const StyledPaginationInfo = styled.span`
  margin: 0 15px;
  color: rgba(244, 247, 251, 0.72);
  font-weight: 600;
`;