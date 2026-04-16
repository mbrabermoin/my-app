import styled, { createGlobalStyle } from "styled-components";

export const TravelFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

/* ── tokens ── */
const sand = "#f5ede0";
const terracotta = "#c4714a";
const deep = "#1a1410";
const warmBrown = "#6b4226";
const sage = "#8a9e7e";
const gold = "#d4a853";
const cream = "#fdf6ec";
const muted = "#9c8b79";

/* ── PAGE SHELL ── */
export const StyledPage = styled.div`
  font-family: 'DM Sans', sans-serif;
  background-color: ${sand};
  color: ${deep};
  min-height: 100vh;
`;

/* ── HEADER ── */
export const StyledPageHeader = styled.header`
  background: ${deep};
  padding: 32px 20px 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,113,74,0.3) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (min-width: 640px) {
    padding: 48px 40px 36px;
  }
`;

export const StyledHeaderInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

export const StyledHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const StyledTitleGroup = styled.div`
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 7vw, 52px);
    color: ${cream};
    line-height: 1;
    letter-spacing: -1px;
    margin: 0;
    em {
      font-style: italic;
      color: ${gold};
    }
  }
  p {
    color: ${muted};
    font-size: 13px;
    font-weight: 300;
    margin-top: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

export const StyledHeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  align-self: flex-start;
`;

export const StyledStatsRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 640px) {
    gap: 32px;
  }
`;

export const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StyledStatLabel = styled.span`
  font-size: 11px;
  color: ${muted};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
`;

export const StyledStatValue = styled.span<{ $accent?: boolean }>`
  font-size: 20px;
  font-weight: 500;
  color: ${(p) => (p.$accent ? gold : cream)};
  letter-spacing: -0.5px;

  @media (min-width: 640px) {
    font-size: 22px;
  }
`;

export const StyledStatDivider = styled.div`
  width: 1px;
  background: rgba(255,255,255,0.1);
  align-self: stretch;
`;

/* ── FILTERS ── */
export const StyledFiltersSection = styled.section`
  background: ${cream};
  border-bottom: 1px solid rgba(0,0,0,0.06);
  padding: 14px 20px;
  position: sticky;
  top: 0;
  z-index: 1;

  @media (min-width: 640px) {
    padding: 20px 40px;
  }
`;

export const StyledFiltersInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledTripFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StyledFilterLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${muted};
  font-weight: 500;
  min-width: 50px;
`;

export const StyledChip = styled.button<{ $active: boolean; $person?: boolean }>`
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
  border: 1.5px solid ${(p) => (p.$active ? (p.$person ? terracotta : deep) : "rgba(0,0,0,0.12)")};
  background: ${(p) => (p.$active ? (p.$person ? terracotta : deep) : "transparent")};
  color: ${(p) => (p.$active ? "white" : warmBrown)};
  cursor: pointer;
  transition: all 0.18s;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    border-color: ${(p) => (p.$person ? terracotta : deep)};
    color: ${(p) => (p.$active ? "white" : (p.$person ? terracotta : deep))};
  }

  &:active {
    transform: scale(0.97);
  }
`;

/* ── MAIN CONTENT ── */
export const StyledMain = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 20px;

  @media (min-width: 640px) {
    padding: 40px;
  }
`;

/* ── TOTALS BAR ── */
export const StyledTotalsBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${deep};
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;

  @media (min-width: 640px) {
    display: flex;
  }
`;

export const StyledTotalCard = styled.div`
  padding: 16px 18px;
  border-right: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);

  &:nth-child(2n) {
    border-right: none;
  }

  @media (min-width: 640px) {
    flex: 1;
    padding: 20px 24px;
    border-bottom: none;
    &:nth-child(2n) {
      border-right: 1px solid rgba(255,255,255,0.06);
    }
    &:last-child {
      border-right: none;
    }
  }
`;

export const StyledTotalCardLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${muted};
  margin-bottom: 6px;
  font-weight: 500;
`;

export const StyledTotalCardValue = styled.div<{ $color?: string }>`
  font-size: 20px;
  font-weight: 500;
  color: ${(p) => p.$color ?? "white"};
  line-height: 1.2;

  @media (min-width: 640px) {
    font-size: 24px;
  }
`;

/* ── TABLE ── */
export const StyledTableWrap = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0,0,0,0.06);
  }
`;

export const StyledExpenseTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledTableHeader = styled.th`
  padding: 16px 20px;
  background: ${deep};
  text-align: left;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
  color: ${muted};
`;

export const StyledTableRow = styled.tr`
  border-bottom: 1px solid rgba(0,0,0,0.05);
  transition: background 0.15s;

  &:hover {
    background: ${sand};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledTableCell = styled.td`
  padding: 15px 20px;
  font-size: 14px;
  color: ${deep};
  font-weight: 400;

  &.date {
    font-size: 12px;
    color: ${muted};
    font-weight: 500;
    white-space: nowrap;
  }

  &.desc {
    font-weight: 500;
  }

  &.responsible {
    font-size: 13px;
    font-weight: 500;
  }

  &.amount {
    font-weight: 500;
    font-size: 15px;
  }

  &.pesos {
    color: ${muted};
    font-size: 13px;
  }

  &.usd {
    color: ${warmBrown};
    font-weight: 500;
  }
`;

export const StyledAvatarBadge = styled.span<{ $name: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 600;
  color: white;
  margin-right: 8px;
  background: ${(p) => (p.$name.toLowerCase().startsWith("j") ? terracotta : sage)};
  vertical-align: middle;
`;

/* ── CARD LIST (mobile) ── */
export const StyledCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const StyledExpenseCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 14px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;

export const StyledCardRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StyledCardLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${muted};
`;

export const StyledCardValue = styled.span`
  font-size: 0.93rem;
  font-weight: 500;
  color: ${deep};

  &.accent { color: ${terracotta}; font-weight: 600; }
  &.usd { color: ${warmBrown}; }
  &.muted { color: ${muted}; }
`;

/* ── BACK / SYNC BUTTONS ── */
export const StyledBackButton = styled.button`
  padding: 10px 20px;
  border-radius: 50px;
  border: 1.5px solid rgba(255,255,255,0.15);
  background: transparent;
  color: ${cream};
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;

  &:hover {
    border-color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.06);
  }

  &:active { transform: scale(0.97); }
`;

export const StyledSyncButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1.5px solid rgba(255,255,255,0.15);
  background: transparent;
  color: ${cream};
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;

  &:hover {
    border-color: ${gold};
    color: ${gold};
  }

  &:active { transform: scale(0.97); }
`;

/* ── MESSAGE ── */
export const StyledMessage = styled.div`
  padding: 48px 20px;
  text-align: center;
  color: ${muted};
  font-size: 15px;
`;

/* ── PAGINATION ── */
export const StyledPaginationContainer = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const StyledPaginationButton = styled.button<{ disabled: boolean }>`
  padding: 9px 20px;
  border-radius: 50px;
  border: 1.5px solid ${(p) => (p.disabled ? "rgba(0,0,0,0.1)" : warmBrown)};
  background: ${(p) => (p.disabled ? "transparent" : warmBrown)};
  color: ${(p) => (p.disabled ? muted : "white")};
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: all 0.18s;

  &:hover {
    background: ${(p) => (p.disabled ? "transparent" : "#5a3520")};
  }

  &:active {
    transform: ${(p) => (p.disabled ? "none" : "scale(0.97)")};
  }
`;

export const StyledPaginationInfo = styled.span`
  color: ${muted};
  font-size: 13px;
  font-weight: 500;
`;

/* ── kept for compatibility (AddExpenseModal may use these) ── */
export const StyledContainer = StyledPage;
export const StyledHeader = StyledTitleGroup;
export const StyledButtonContainer = StyledHeaderActions;
export const StyledSummary = StyledTotalsBar;
export const StyledSummaryItem = StyledTotalCardLabel;
export const StyledSummaryValue = StyledTotalCardValue;
export const StyledTripFilterButton = StyledChip;
