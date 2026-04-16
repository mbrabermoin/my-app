import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  background: rgba(8, 14, 26, 0.72);
  backdrop-filter: blur(18px);
  min-height: 100vh;
  color: #f4f7fb;

  @media (min-width: 640px) {
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 28px;
    width: min(1080px, 100%);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
  }
`;

export const StyledHeader = styled.h1`
  margin: 0 0 16px;
  text-align: left;
  font-size: clamp(1.6rem, 5vw, 3.1rem);
  line-height: 1.1;
  color: #f4f7fb;
`;

export const StyledButtonContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledBackButton = styled.button`
  padding: 9px 16px;
  font-size: 0.88rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  color: #f4f7fb;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:active {
    transform: scale(0.97);
  }

  @media (min-width: 640px) {
    padding: 10px 20px;
    font-size: 1rem;
    &:hover {
      border-color: rgba(78, 205, 196, 0.52);
      background: linear-gradient(180deg, rgba(78, 205, 196, 0.16), rgba(255, 255, 255, 0.05));
      transform: translateY(-2px);
    }
  }
`;

export const StyledSyncButton = styled.button`
  padding: 9px 16px;
  font-size: 0.88rem;
  background: linear-gradient(180deg, rgba(78, 205, 196, 0.26), rgba(78, 205, 196, 0.14));
  color: #f4f7fb;
  border: 1px solid rgba(78, 205, 196, 0.52);
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:active {
    transform: scale(0.97);
  }

  @media (min-width: 640px) {
    padding: 10px 20px;
    font-size: 1rem;
    &:hover {
      border-color: rgba(133, 240, 232, 0.8);
      background: linear-gradient(180deg, rgba(78, 205, 196, 0.36), rgba(78, 205, 196, 0.2));
      transform: translateY(-2px);
    }
  }
`;

export const StyledTripFilterContainer = styled.div`
  margin-bottom: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledFilterLabel = styled.span`
  color: rgba(244, 247, 251, 0.58);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const StyledTripFilterButton = styled.button<{ $active: boolean }>`
  padding: 7px 14px;
  font-size: 0.85rem;
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

  &:active {
    transform: scale(0.97);
  }

  @media (min-width: 640px) {
    padding: 8px 16px;
    font-size: 1rem;
    &:hover {
      transform: translateY(-2px);
      border-color: rgba(78, 205, 196, 0.52);
      background: linear-gradient(180deg, rgba(78, 205, 196, 0.16), rgba(255, 255, 255, 0.05));
    }
  }
`;

export const StyledSummary = styled.div`
  margin: 0 0 16px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;

  @media (min-width: 640px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 12px 14px;
    gap: 12px;
  }
`;

export const StyledSummaryItem = styled.span`
  color: rgba(244, 247, 251, 0.78);
  font-size: 0.88rem;
  font-weight: 600;

  @media (min-width: 640px) {
    font-size: 0.98rem;
    white-space: nowrap;
  }
`;

export const StyledSummaryValue = styled.strong`
  color: #f4f7fb;
  font-weight: 700;
`;

/* ── Table: hidden on mobile, visible on desktop ── */
export const StyledExpenseTable = styled.table`
  display: none;

  @media (min-width: 768px) {
    display: table;
    width: 100%;
    border-collapse: collapse;
    background: rgba(8, 14, 26, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(10px);
  }
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

/* ── Card list: visible on mobile, hidden on desktop ── */
export const StyledCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const StyledExpenseCard = styled.div`
  background: rgba(8, 14, 26, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 14px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
`;

export const StyledCardRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StyledCardLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(244, 247, 251, 0.45);
`;

export const StyledCardValue = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #f4f7fb;

  &.accent {
    color: #85f0e8;
  }
`;

export const StyledMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: rgba(244, 247, 251, 0.78);
  font-size: 1.1rem;
  border-radius: 12px;
`;

export const StyledPaginationContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const StyledPaginationButton = styled.button<{ disabled: boolean }>`
  padding: 9px 16px;
  font-size: 0.88rem;
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

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "scale(0.97)")};
  }

  @media (min-width: 640px) {
    padding: 10px 20px;
    font-size: 1rem;
    &:hover {
      background: ${(props) =>
        props.disabled
          ? "rgba(255, 255, 255, 0.05)"
          : "linear-gradient(180deg, rgba(78, 205, 196, 0.36), rgba(78, 205, 196, 0.2))"};
      transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    }
  }
`;

export const StyledPaginationInfo = styled.span`
  color: rgba(244, 247, 251, 0.72);
  font-weight: 600;
  font-size: 0.88rem;

  @media (min-width: 640px) {
    font-size: 1rem;
    margin: 0 15px;
  }
`;
