import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../../lib/api";
import {
  StyledAddButton,
  StyledModalOverlay,
  StyledModalContent,
  StyledModalHeader,
  StyledErrorContainer,
  StyledFieldContainer,
  StyledLabel,
  StyledInput,
  StyledErrorText,
  StyledButtonContainer,
  StyledCancelButton,
  StyledSubmitButton,
} from "./AddExpenseModal.styles";

interface Expense {
  id: number;
  type: string;
  amount: number;
  date: string;
  category: string;
}

interface FormData {
  type: string;
  amount: number;
  date: string;
  category: string;
}

interface AddExpenseModalProps {
  onAddExpense: (expense: Expense) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onAddExpense }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(apiUrl("/api/expenses"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      const newExpense = result.data || result;

      onAddExpense(newExpense);
      reset();
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error creating expense");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
    reset();
  };

  return (
    <>
      <StyledAddButton onClick={() => setIsModalOpen(true)}>
        + Agregar Gasto
      </StyledAddButton>

      {/* Modal */}
      {isModalOpen && (
        <StyledModalOverlay>
          <StyledModalContent>
            <StyledModalHeader>Add New Expense</StyledModalHeader>

            {error && <StyledErrorContainer>{error}</StyledErrorContainer>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledFieldContainer>
                <StyledLabel>Description:</StyledLabel>
                <StyledInput
                  type="text"
                  hasError={!!errors.type}
                  {...register("type", {
                    required: "Description is required",
                    minLength: {
                      value: 2,
                      message: "Description must be at least 2 characters",
                    },
                  })}
                  placeholder="Enter description"
                />
                {errors.type && (
                  <StyledErrorText>{errors.type.message}</StyledErrorText>
                )}
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledLabel>Amount:</StyledLabel>
                <StyledInput
                  type="number"
                  step="0.01"
                  hasError={!!errors.amount}
                  {...register("amount", {
                    required: "Amount is required",
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0",
                    },
                  })}
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <StyledErrorText>{errors.amount.message}</StyledErrorText>
                )}
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledLabel>Date:</StyledLabel>
                <StyledInput
                  type="date"
                  hasError={!!errors.date}
                  {...register("date", {
                    required: "Date is required",
                  })}
                />
                {errors.date && (
                  <StyledErrorText>{errors.date.message}</StyledErrorText>
                )}
              </StyledFieldContainer>

              <StyledFieldContainer marginBottom="20px">
                <StyledLabel>Category:</StyledLabel>
                <StyledInput
                  type="text"
                  hasError={!!errors.category}
                  {...register("category", {
                    required: "Category is required",
                  })}
                  placeholder="Enter category"
                />
                {errors.category && (
                  <StyledErrorText>{errors.category.message}</StyledErrorText>
                )}
              </StyledFieldContainer>

              <StyledButtonContainer>
                <StyledCancelButton
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Cancel
                </StyledCancelButton>
                <StyledSubmitButton
                  type="submit"
                  disabled={!isValid || isLoading}
                  isValid={isValid}
                  isLoading={isLoading}
                >
                  {isLoading ? "Creating..." : "Add"}
                </StyledSubmitButton>
              </StyledButtonContainer>
            </form>
          </StyledModalContent>
        </StyledModalOverlay>
      )}
    </>
  );
};

export default AddExpenseModal;