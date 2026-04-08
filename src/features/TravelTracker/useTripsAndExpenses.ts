import { useState, useEffect } from "react";
import { apiUrl } from "../../lib/api";

interface Trip {
  id: number;
  destiny: string;
  month: string;
  year: number;
  dolarExchange: number;
}

interface Expense {
  id: number;
  type: string;
  amount: number;
  date: string;
  category: string;
  tripDescription: string;
  exchange: string;
}

interface PaginationParams {
  totalPages: number;
  totalExpenses: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useTripsAndExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>({
    totalPages: 0,
    totalExpenses: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    loadTrips();
    loadExpenses(1);
  }, []);

  useEffect(() => {
    loadExpenses(1);
  }, [selectedTrip]);

  const loadTrips = async () => {
    try {
      const response = await fetch(
        apiUrl("/api/trips?page=1"),
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTrips(data.data.trips || []);
    } catch (error) {
      console.error("❌ Error loading trips:", error);
      setTrips([]);
    }
  };

  const loadExpenses = async (currentPage: number) => {
    try {
      setLoading(true);
      let url = apiUrl(`/api/expenses?page=${currentPage}`);
      if (selectedTrip) {
        url += `&travelId=${selectedTrip.id}`;
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setExpenses(data.data.expenses || []);

      if (data.data.pagination) {
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("❌ Error loading expenses:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    loadExpenses(1);
  };

  return {
    expenses,
    trips,
    loading,
    selectedTrip,
    setSelectedTrip,
    pagination,
    loadExpenses,
    handleAddExpense,
  };
};