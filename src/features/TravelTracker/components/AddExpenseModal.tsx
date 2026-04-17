import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../../lib/api";
import {
  StyledAddButton,
  StyledModalOverlay,
  StyledModalContent,
  StyledModalHeader,
  StyledErrorContainer,
  StyledSuccessPopup,
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
  date: string;
  description: string;
  exchange: string;
  amount: string;
  paidBy: string;
  paymentMethod: string;
  notes: string;
}

interface AddExpenseModalProps {
  onAddExpense: (expense: Expense) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onAddExpense }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const todayDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      date: todayDate,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(apiUrl("/api/expenses/sheet"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = `Error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorData?.error || errorMessage;
        } catch {
          // keep default status message when response is not JSON
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      onAddExpense(result.data || result);
      reset({ date: todayDate });
      setIsModalOpen(false);
      setSuccessMessage("El gasto se agregó correctamente!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agregar gasto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
    setSuccessMessage("");
    reset({ date: todayDate });
  };

  return (
    <>
      <StyledAddButton onClick={() => setIsModalOpen(true)}>
        + Agregar Gasto
      </StyledAddButton>

      {isModalOpen && (
        <StyledModalOverlay>
          <StyledModalContent>
            <StyledModalHeader>Agregar Gasto</StyledModalHeader>

            {error && <StyledErrorContainer>{error}</StyledErrorContainer>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledFieldContainer>
                <StyledLabel>Fecha:</StyledLabel>
                <StyledInput
                  type="date"
                  hasError={!!errors.date}
                  {...register("date", { required: "La fecha es requerida" })}
                />
                {errors.date && <StyledErrorText>{errors.date.message}</StyledErrorText>}
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledLabel>Descripción:</StyledLabel>
                <StyledInput
                  type="text"
                  hasError={!!errors.description}
                  {...register("description", { required: "La descripción es requerida", minLength: { value: 2, message: "Mínimo 2 caracteres" } })}
                  placeholder="Ej: Almuerzo, Hotel..."
                />
                {errors.description && <StyledErrorText>{errors.description.message}</StyledErrorText>}
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledLabel>Monto (separado por .) :</StyledLabel>
                <StyledInput
                  type="number"
                  step="0.01"
                  hasError={!!errors.amount}
                  {...register("amount", { required: "El monto es requerido", min: { value: 0.01, message: "Debe ser mayor a 0" } })}
                  placeholder="0.00"
                />
                {errors.amount && <StyledErrorText>{errors.amount.message}</StyledErrorText>}
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledLabel>Cambio:</StyledLabel>
                <StyledInput
                  as="select"
                  hasError={!!errors.exchange}
                  {...register("exchange", { required: "El cambio es requerido" })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccionar moneda
                  </option>
                  <option value="Pesos">Pesos</option>
                  <option value="Real">Real</option>
                  <option value="Dólar">Dólar</option>
                </StyledInput>
                {errors.exchange && <StyledErrorText>{errors.exchange.message}</StyledErrorText>}
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledLabel>Responsable:</StyledLabel>
                <StyledInput
                  as="select"
                  hasError={!!errors.paidBy}
                  {...register("paidBy", { required: "El responsable es requerido" })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccionar responsable
                  </option>
                  <option value="Mati">Mati</option>
                  <option value="Juli">Juli</option>
                  <option value="Otro">Otro</option>
                </StyledInput>
                {errors.paidBy && <StyledErrorText>{errors.paidBy.message}</StyledErrorText>}
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledLabel>Medio de pago:</StyledLabel>
                <StyledInput
                  as="select"
                  hasError={!!errors.paymentMethod}
                  {...register("paymentMethod", { required: "El medio de pago es requerido" })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccionar medio de pago
                  </option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Pix">Pix</option>
                </StyledInput>
                {errors.paymentMethod && <StyledErrorText>{errors.paymentMethod.message}</StyledErrorText>}
              </StyledFieldContainer>

              <StyledFieldContainer marginBottom="20px">
                <StyledLabel>Notas:</StyledLabel>
                <StyledInput
                  type="text"
                  hasError={!!errors.notes}
                  {...register("notes")}
                  placeholder="Opcional..."
                />
              </StyledFieldContainer>

              <StyledButtonContainer>
                <StyledCancelButton
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Cancelar
                </StyledCancelButton>
                <StyledSubmitButton
                  type="submit"
                  disabled={!isValid || isLoading}
                  isValid={isValid}
                  isLoading={isLoading}
                >
                  {isLoading ? "Guardando..." : "Agregar"}
                </StyledSubmitButton>
              </StyledButtonContainer>
            </form>
          </StyledModalContent>
        </StyledModalOverlay>
      )}

      {successMessage && <StyledSuccessPopup>{successMessage}</StyledSuccessPopup>}
    </>
  );
};

export default AddExpenseModal;