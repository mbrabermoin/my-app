"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddUserModal from "./components/AddUserModal";
import { apiUrl } from "../../lib/api";
import {
  StyledContainer,
  StyledHeader,
  StyledButtonContainer,
  StyledBackButton,
  StyledUserTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableCell,
  StyledMessage,
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationInfo,
} from "./UserList.styles";

interface User {
  id: number;
  name: string;
  email: string;
}

interface PaginationParams {
  totalPages: number;
  totalUsers: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const UserList: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationParams>({
    totalPages: 0,
    totalUsers: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    loadUsers(1);
  }, []);

  const loadUsers = async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        apiUrl(`/api/users?page=${currentPage}&limit=5`),
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data.users || []);

      if (data.data.pagination) {
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("❌ Error loading users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    loadUsers(1);
  };

  const { currentPage, totalPages, totalUsers, hasNextPage, hasPrevPage } =
    pagination;

  const renderUserContent = () => {
    if (loading) {
      return <StyledMessage>Loading users...</StyledMessage>;
    }
    if (users.length === 0) {
      return <StyledMessage>No users found.</StyledMessage>;
    }
    return (
      <StyledUserTable>
        <thead>
          <tr>
            <StyledTableHeader>ID</StyledTableHeader>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Email</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell>{user.id}</StyledTableCell>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledUserTable>
    );
  };

  return (
    <StyledContainer>
      <StyledHeader>User List</StyledHeader>

      <StyledButtonContainer>
        <StyledBackButton onClick={() => router.push("/")}>
          ← Back to Home
        </StyledBackButton>
        <AddUserModal onAddUser={handleAddUser} />
      </StyledButtonContainer>

      {renderUserContent()}

      <StyledPaginationContainer>
        <StyledPaginationButton
          disabled={!hasPrevPage}
          onClick={() => loadUsers(currentPage - 1)}
        >
          ← Previous
        </StyledPaginationButton>

        <StyledPaginationInfo>
          Page {currentPage} of {totalPages} | Showing {users.length}/
          {totalUsers} users
        </StyledPaginationInfo>

        <StyledPaginationButton
          disabled={!hasNextPage}
          onClick={() => loadUsers(currentPage + 1)}
        >
          Next →
        </StyledPaginationButton>
      </StyledPaginationContainer>
    </StyledContainer>
  );
};

export default UserList;
