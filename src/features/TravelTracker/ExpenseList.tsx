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
  const dollarExchange = selectedTrip?.dolarExchange ?? 1;
  const round2 = (value: number) => Math.round(value * 100) / 100;
  const formatDate = (date?: string) => {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("es-AR", {
      timeZone: "UTC",
    }).format(new Date(date));
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
        ? expense * dollarExchange
        : expense,
    );
  };

  const getDollarAmount = (expense: number, exchange: string) => {
    const normalized = normalizeExchange(exchange);

    return round2(
      normalized.startsWith("pes") || normalized.startsWith("ars")
        ? expense / dollarExchange
        : expense,
    );
  };

  const renderExpenseContent = () => {
    if (loading) {
      return (
        <tbody>
          <StyledTableRow>
            <StyledTableCell colSpan={5}>
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
            <StyledTableCell colSpan={5}>
              <StyledMessage>No expenses found.</StyledMessage>
            </StyledTableCell>
          </StyledTableRow>
        </tbody>
      );
    }

    return (
      <tbody>
        {expenses.map((expense) => (
          <StyledTableRow key={expense.id}>
            <StyledTableCell>{formatDate(expense.date)}</StyledTableCell>
            <StyledTableCell>{expense.type}</StyledTableCell>
            <StyledTableCell>{getExchange(expense.exchange)} {expense.amount}</StyledTableCell>
            <StyledTableCell>{"$ " + getLocalCurrencyAmount(expense.amount, expense.exchange)}</StyledTableCell>
            <StyledTableCell>{"U$D " + getDollarAmount(expense.amount, expense.exchange)}</StyledTableCell>
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
        <AddExpenseModal onAddExpense={handleAddExpense} />
        <StyledSyncButton onClick={() => handleSyncClick()}>
          Sync with Google Sheets
        </StyledSyncButton>
      </StyledButtonContainer>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          key="all"
          onClick={() => setSelectedTrip(null)}
          style={{
            padding: "8px 16px",
            backgroundColor: selectedTrip === null ? "#4ecdc4" : "#f0f0f0",
            color: selectedTrip === null ? "white" : "#333",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          All
        </button>
        {trips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => setSelectedTrip(trip)}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedTrip?.id === trip.id ? "#4ecdc4" : "#f0f0f0",
              color: selectedTrip?.id === trip.id ? "white" : "#333",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {trip.destiny}
          </button>
        ))}
      </div>
      <StyledHeader>Total Expenses: {expenses.length} - Dollar: {selectedTrip?.dolarExchange ?? "-"}</StyledHeader>
      <StyledExpenseTable>
        <thead>
          <tr>
            <StyledTableHeader>Date</StyledTableHeader>
            <StyledTableHeader>Description</StyledTableHeader>
            <StyledTableHeader>Amount</StyledTableHeader>
            <StyledTableHeader>Local Currency</StyledTableHeader>
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