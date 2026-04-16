"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AddExpenseModal from "./components/AddExpenseModal";
import { useTripsAndExpenses } from "./useTripsAndExpenses";
import { apiUrl } from "../../lib/api";
import {
  StyledContainer,
  StyledHeader,
  StyledButtonContainer,
  StyledBackButton,
  StyledMessage,
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationInfo,
  StyledTableHeader,
  StyledTableRow,
  StyledTableCell,
  StyledExpenseTable,
  StyledSyncButton,
  StyledTripFilterContainer,
  StyledTripFilterButton,
  StyledSummary,
  StyledSummaryItem,
  StyledSummaryValue,
  StyledFilterLabel,
} from "./ExpenseList.styles";

const ExpenseList: React.FC = () => {
  const router = useRouter();
  const {
    expenses,
    trips,
    loading,
    selectedTrip,
    setSelectedTrip,
    pagination,
    loadExpenses,
    handleAddExpense,
  } = useTripsAndExpenses();

  const { currentPage, hasNextPage, hasPrevPage } = pagination;
  const [selectedResponsible, setSelectedResponsible] = React.useState<string | null>(null);
  const dolarPesosExchange = selectedTrip?.dolarPesosExchange ?? 1;
  const dolarRealExchange = selectedTrip?.dolarRealExchange ?? 1;
  const round2 = (value: number) => Math.round(value * 100) / 100;
  const formatDate = (date?: string) => {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("es-AR", {
      timeZone: "UTC",
    }).format(new Date(date));
  };

  const formatTripDate = (date?: string | Date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = date instanceof Date ? date : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("es-AR", { timeZone: "UTC" });
  };

  const normalizeExchange = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const getExchange = (exchange: string) => {
    const normalized = normalizeExchange(exchange);

    if (normalized.startsWith("pes") || normalized.startsWith("ars")) {
      return "$";
    }

    if (normalized.startsWith("dol") || normalized.startsWith("usd")) {
      return "U$D";
    }

    if (normalized.startsWith("rea") || normalized.startsWith("brl")) {
      return "R$";
    }

    return "-";
  };

  const getLocalCurrencyAmount = (expense: number, exchange: string) => {
    const normalized = normalizeExchange(exchange);

    return round2(
      normalized.startsWith("dol") || normalized.startsWith("usd")
        ? expense * dolarPesosExchange
        : normalized.startsWith("rea") || normalized.startsWith("brl")
        ? expense / dolarRealExchange * dolarPesosExchange
        : expense,
    );
  };

  const getDollarAmount = (expense: number, exchange: string) => {
    const normalized = normalizeExchange(exchange);

    return round2(
      normalized.startsWith("pes") || normalized.startsWith("ars")
        ? expense / dolarPesosExchange
        : normalized.startsWith("rea") || normalized.startsWith("brl")
        ? expense / dolarRealExchange
        : expense,
    );
  };

  const responsibles = Array.from(
    new Set(expenses.map((e) => e.responsible).filter(Boolean)),
  ).sort();

  const filteredExpenses = selectedResponsible
    ? expenses.filter((e) => e.responsible === selectedResponsible)
    : expenses;

  const expensesWithTotals = filteredExpenses.map((expense) => ({
    ...expense,
    displayExchange: getExchange(expense.exchange),
    localCurrencyAmount: getLocalCurrencyAmount(expense.amount, expense.exchange),
    dollarAmount: getDollarAmount(expense.amount, expense.exchange),
  }));

  const totals = expensesWithTotals.reduce(
    (accumulator, expense) => ({
      localCurrencyAmount: round2(
        accumulator.localCurrencyAmount + expense.localCurrencyAmount,
      ),
      dollarAmount: round2(accumulator.dollarAmount + expense.dollarAmount),
    }),
    {
      localCurrencyAmount: 0,
      dollarAmount: 0,
    },
  );

  const renderExpenseContent = () => {
    if (loading) {
      return (
        <tbody>
          <StyledTableRow>
            <StyledTableCell colSpan={6}>
              <StyledMessage>Loading expenses...</StyledMessage>
            </StyledTableCell>
          </StyledTableRow>
        </tbody>
      );
    }

    if (expenses.length === 0) {
      return (
        <tbody>
          <StyledTableRow>
            <StyledTableCell colSpan={6}>
              <StyledMessage>No expenses found.</StyledMessage>
            </StyledTableCell>
          </StyledTableRow>
        </tbody>
      );
    }

    return (
      <tbody>
        {expensesWithTotals.map((expense) => (
          <StyledTableRow key={expense.id}>
            <StyledTableCell>{formatDate(expense.date)}</StyledTableCell>
            <StyledTableCell>{expense.type}</StyledTableCell>
            
            <StyledTableCell>{expense.responsible}</StyledTableCell>
            <StyledTableCell>{expense.displayExchange} {expense.amount}</StyledTableCell>
            <StyledTableCell>{"$ " + expense.localCurrencyAmount}</StyledTableCell>
            <StyledTableCell>{"U$D " + expense.dollarAmount}</StyledTableCell>
          </StyledTableRow>
        ))}
      </tbody>
    );
  };

  const handleSyncClick = async () => {
    try {
        const response = await fetch(apiUrl("/api/admin/sync-sheets"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
        } else {
            alert("Error: " + data.message);
        }
    } catch {
        alert("Cannot connect with server. Please try again later.");
    }
};

  return (
    <StyledContainer>
      <StyledHeader>Expense List</StyledHeader>
      <StyledButtonContainer>
        <StyledBackButton onClick={() => router.push("/")}>
          ← Back to Home
        </StyledBackButton>
        <StyledSyncButton onClick={() => handleSyncClick()}>
          Sync with Google Sheets
        </StyledSyncButton>
        <AddExpenseModal onAddExpense={handleAddExpense} />
      </StyledButtonContainer>

      <StyledTripFilterContainer>
        <StyledTripFilterButton
          key="all"
          onClick={() => setSelectedTrip(null)}
          $active={selectedTrip === null}
        >
          All
        </StyledTripFilterButton>
        {trips.map((trip) => (
          <StyledTripFilterButton
            key={trip.id}
            onClick={() => setSelectedTrip(trip)}
            $active={selectedTrip?.id === trip.id}
          >
            {trip.destiny}
          </StyledTripFilterButton>
        ))}
      </StyledTripFilterContainer>

      <StyledTripFilterContainer>
        <StyledFilterLabel>Paid By:</StyledFilterLabel>
        <StyledTripFilterButton
          onClick={() => setSelectedResponsible(null)}
          $active={selectedResponsible === null}
        >
          All
        </StyledTripFilterButton>
        {responsibles.map((responsible) => (
          <StyledTripFilterButton
            key={responsible}
            onClick={() => setSelectedResponsible(responsible)}
            $active={selectedResponsible === responsible}
          >
            {responsible}
          </StyledTripFilterButton>
        ))}
      </StyledTripFilterContainer>

      <StyledSummary>
        <StyledSummaryItem>
          Total Expenses: <StyledSummaryValue>{expenses.length}</StyledSummaryValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          Dollar: <StyledSummaryValue>{selectedTrip?.dolarPesosExchange ?? "-"}</StyledSummaryValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          Total Pesos: <StyledSummaryValue>{"$ " + totals.localCurrencyAmount}</StyledSummaryValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          Total Dollar: <StyledSummaryValue>{"U$D " + totals.dollarAmount}</StyledSummaryValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          From: <StyledSummaryValue>{formatTripDate(selectedTrip?.startDate)}</StyledSummaryValue>
        </StyledSummaryItem>
        <StyledSummaryItem>
          To: <StyledSummaryValue>{formatTripDate(selectedTrip?.endDate)}</StyledSummaryValue>
        </StyledSummaryItem>
      </StyledSummary>
      <StyledExpenseTable>
        <thead>
          <tr>
            <StyledTableHeader>Date</StyledTableHeader>
            <StyledTableHeader>Description</StyledTableHeader>
            <StyledTableHeader>Paid By</StyledTableHeader>
            <StyledTableHeader>Amount</StyledTableHeader>
            <StyledTableHeader>Pesos</StyledTableHeader>
            <StyledTableHeader>Dollar</StyledTableHeader>
          </tr>
        </thead>
        {renderExpenseContent()}
      </StyledExpenseTable>
      
      <StyledPaginationContainer>
        <StyledPaginationButton
          disabled={!hasPrevPage}
          onClick={() => loadExpenses(currentPage - 1)}
        >
          ← Previous
        </StyledPaginationButton>

        <StyledPaginationInfo>
           Showing {expenses.length} expenses
        </StyledPaginationInfo>

        <StyledPaginationButton
          disabled={!hasNextPage}
          onClick={() => loadExpenses(currentPage + 1)}
        >
          Next →
        </StyledPaginationButton>
      </StyledPaginationContainer>
    </StyledContainer>
  );
};

export default ExpenseList;