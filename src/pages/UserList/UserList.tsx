import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserModal from "./components/AddUserModal";
import {
  StyledContainer,
  StyledHeader,
  StyledButtonContainer,
  StyledBackButton,
  StyledUserGrid,
  StyledUserCard,
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
  const navigate = useNavigate();
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
        `http://localhost:3001/api/users?page=${currentPage}&limit=5`,
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
    return users.map((user) => (
      <StyledUserCard key={user.id}>
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
      </StyledUserCard>
    ));
  };

  return (
    <StyledContainer>
      <StyledHeader>User List</StyledHeader>

      <StyledButtonContainer>
        <StyledBackButton onClick={() => navigate("/")}>
          ← Back to Home
        </StyledBackButton>
        <AddUserModal onAddUser={handleAddUser} />
      </StyledButtonContainer>

      <StyledUserGrid>{renderUserContent()}</StyledUserGrid>

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
