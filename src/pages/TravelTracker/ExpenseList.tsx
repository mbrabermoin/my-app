import React from "react";
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "./components/AddExpenseModal";
import { useTripsAndExpenses } from "./useTripsAndExpenses";
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
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const {
    expenses,
    loading,
    selectedTravel,
    setSelectedTravel,
    pagination,
    loadExpenses,
    getUniqueTravels,
    handleAddExpense,
  } = useTripsAndExpenses();

  const { currentPage, hasNextPage, hasPrevPage } = pagination;

  const getExchange = (exchange: string) => {
    if (exchange==="Pesos") {
      return "$";
    }
    if (exchange==="Dólar") {
      return "U$D";
    }
     if (exchange==="Real") {
      return "R$";
    }
    return "-";
  }

  const renderExpenseContent = () => {
    if (loading) {
      return <StyledMessage>Loading expenses...</StyledMessage>;
    }
    if (expenses.length === 0) {
      return <StyledMessage>No expenses found.</StyledMessage>;
    }
    return (
      <StyledExpenseTable>
        <thead>
          <tr>
            <StyledTableHeader>Date</StyledTableHeader>
            <StyledTableHeader>Exchange</StyledTableHeader>
            <StyledTableHeader>Amount</StyledTableHeader>
            <StyledTableHeader>Description</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <StyledTableRow key={expense.id}>
              <StyledTableCell>{expense.date ? new Date(expense.date).toLocaleDateString() : "-"}</StyledTableCell>
              <StyledTableCell>{getExchange(expense.exchange)}</StyledTableCell>
              <StyledTableCell>{expense.amount}</StyledTableCell>
              <StyledTableCell>{expense.type}</StyledTableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledExpenseTable>
    );
  };

  const handleSyncClick = async () => {
    try {
        const response = await fetch(`${API_URL}/api/admin/sync-sheets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Cannot connect with server. Please try again later.");
    }
};

  return (
    <StyledContainer>
      <StyledHeader>Expense List</StyledHeader>
      <StyledButtonContainer>
        <StyledBackButton onClick={() => navigate("/")}>
          ← Back to Home
        </StyledBackButton>
        <AddExpenseModal onAddExpense={handleAddExpense} />
        <StyledSyncButton onClick={() => handleSyncClick()}>
          Sync with Google Sheets
        </StyledSyncButton>
      </StyledButtonContainer>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {getUniqueTravels().map((travel) => (
          <button
            key={travel}
            onClick={() => setSelectedTravel(travel)}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedTravel === travel ? "#4ecdc4" : "#f0f0f0",
              color: selectedTravel === travel ? "white" : "#333",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {travel}
          </button>
        ))}
      </div>
      <StyledHeader>Total Expenses: {expenses.length} - Dólar: {}</StyledHeader>
      <StyledExpenseTable>{renderExpenseContent()}</StyledExpenseTable>
      
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