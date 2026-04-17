import { useState, useEffect } from "react";
import { apiUrl } from "../../lib/api";

interface Trip {
  id: number;
  destiny: string;
  dolarRealExchange: number;
  dolarPesosExchange: number;
  startDate: string | Date;
  endDate: string | Date;
  paidBy: string;
}

interface Expense {
  id: number;
  type: string;
  amount: number;
  date: string;
  category: string;
  travelId: string;
  tripDescription: string;
  exchange: string;
  responsible: string;
}

interface ExpenseApiItem {
  id?: number;
  type?: string;
  amount?: number | string;
  date?: string;
  category?: string;
  travelId?: string | number;
  travelid?: string | number;
  tripDescription?: string;
  travelDescription?: string;
  exchange?: string;
  responsible?: string;
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
      const url = selectedTrip
        ? apiUrl(`/api/expenses?page=${currentPage}&limit=50&travelId=${selectedTrip.id}`)
        : apiUrl("/api/expenses");
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const normalizedExpenses: Expense[] = (data.data.expenses || []).map((item: ExpenseApiItem) => ({
        id: Number(item.id || 0),
        type: String(item.type || ""),
        amount: Number(item.amount || 0),
        date: String(item.date || ""),
        category: String(item.category || ""),
        travelId: String(item.travelId ?? item.travelid ?? ""),
        tripDescription: String(item.tripDescription ?? item.travelDescription ?? ""),
        exchange: String(item.exchange || ""),
        responsible: String(item.responsible || ""),
      }));

      setExpenses(normalizedExpenses);

      if (data.data.pagination) {
        setPagination(data.data.pagination);
      } else {
        setPagination({
          totalPages: 1,
          totalExpenses: normalizedExpenses.length,
          currentPage: 1,
          hasNextPage: false,
          hasPrevPage: false,
        });
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