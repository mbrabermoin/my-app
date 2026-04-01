import { useState, useEffect } from "react";

interface Trip {
  id: number;
  destiny: string;
}

interface Expense {
  id: number;
  type: string;
  amount: number;
  date: string;
  category: string;
  travelDescription: string;
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
  const API_URL = import.meta.env.VITE_API_URL;
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTravel, setSelectedTravel] = useState<string>("All");
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
  }, [selectedTravel]);

  const loadTrips = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/trips?page=1`,
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
      let url = `${API_URL}/api/expenses?page=${currentPage}`;
      if (selectedTravel !== "All") {
        const selectedTrip = trips.find(trip => trip.destiny === selectedTravel);
        if (selectedTrip) {
          url += `&travelId=${selectedTrip.id}`;
        }
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("EXPENSES RESPONSE:", data.data.expenses);
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

  const getUniqueTravels = () => {
    const travels = trips.map(trip => trip.destiny);
    return ["All", ...travels];
  };

  const handleAddExpense = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    loadExpenses(1);
  };

  return {
    expenses,
    trips,
    loading,
    selectedTravel,
    setSelectedTravel,
    pagination,
    loadExpenses,
    getUniqueTravels,
    handleAddExpense,
  };
};