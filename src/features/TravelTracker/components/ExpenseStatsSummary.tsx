import React from "react";
import styled, { keyframes } from "styled-components";
import {
  StyledStatsRow,
  StyledStat,
  StyledStatLabel,
  StyledStatValue,
  StyledStatDivider,
} from "../ExpenseList.styles";

type ExpenseStatsSummaryProps = {
  totalExpenses: number;
  dollarTotal: number;
  localCurrencyAmount: number;
  showDollarRate: boolean;
  dolarPesosExchange: number;
  formatAmount: (value: number) => string;
  loading?: boolean;
};

const shimmer = keyframes`
  0% { background-position: -180px 0; }
  100% { background-position: 180px 0; }
`;

const StyledValueSkeleton = styled.span`
  display: inline-block;
  width: 72px;
  height: 18px;
  border-radius: 8px;
  background: linear-gradient(90deg, #ece8df 20%, #f7f3ea 50%, #ece8df 80%);
  background-size: 360px 100%;
  animation: ${shimmer} 1.2s linear infinite;
`;

const ExpenseStatsSummary: React.FC<ExpenseStatsSummaryProps> = ({
  totalExpenses,
  dollarTotal,
  localCurrencyAmount,
  showDollarRate,
  dolarPesosExchange,
  formatAmount,
  loading = false,
}) => {
  const renderValue = (value: React.ReactNode) => (loading ? <StyledValueSkeleton /> : value);

  return (
    <StyledStatsRow>
      <StyledStat>
        <StyledStatLabel>Gastos</StyledStatLabel>
        <StyledStatValue>{renderValue(totalExpenses)}</StyledStatValue>
      </StyledStat>
      <StyledStatDivider />
      <StyledStat>
        <StyledStatLabel>Total en USD</StyledStatLabel>
        <StyledStatValue $accent>{renderValue(<>U$D {formatAmount(dollarTotal)}</>)}</StyledStatValue>
      </StyledStat>
      <StyledStatDivider />
      <StyledStat>
        <StyledStatLabel>Total en Pesos</StyledStatLabel>
        <StyledStatValue>{renderValue(<>$ {formatAmount(localCurrencyAmount)}</>)}</StyledStatValue>
      </StyledStat>
      {showDollarRate && (
        <>
          <StyledStatDivider />
          <StyledStat>
            <StyledStatLabel>Dolar</StyledStatLabel>
            <StyledStatValue>{renderValue(<>$ {formatAmount(dolarPesosExchange)}</>)}</StyledStatValue>
          </StyledStat>
        </>
      )}
    </StyledStatsRow>
  );
};

export default ExpenseStatsSummary;
