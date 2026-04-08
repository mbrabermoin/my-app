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
} from "./AddUserModal.styles";

interface User {
  id: number;
  name: string;
  email: string;
}

interface FormData {
  name: string;
  email: string;
}

interface AddUserModalProps {
  onAddUser: (user: User) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onAddUser }) => {
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
      const response = await fetch(apiUrl("/api/users"), {
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

      const newUser = result.data || result;

      onAddUser(newUser);
      reset();
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error creating user");
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
        + Add User
      </StyledAddButton>

      {/* Modal */}
      {isModalOpen && (
        <StyledModalOverlay>
          <StyledModalContent>
            <StyledModalHeader>Add New User</StyledModalHeader>

            {error && <StyledErrorContainer>{error}</StyledErrorContainer>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledFieldContainer>
                <StyledLabel>Name:</StyledLabel>
                <StyledInput
                  type="text"
                  hasError={!!errors.name}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <StyledErrorText>{errors.name.message}</StyledErrorText>
                )}
              </StyledFieldContainer>

              <StyledFieldContainer marginBottom="20px">
                <StyledLabel>Email:</StyledLabel>
                <StyledInput
                  type="email"
                  hasError={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <StyledErrorText>{errors.email.message}</StyledErrorText>
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

export default AddUserModal;
