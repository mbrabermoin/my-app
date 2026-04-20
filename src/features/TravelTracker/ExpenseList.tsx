"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AddExpenseModal from "./components/AddExpenseModal";
import TripsGallery from "./components/TripsGallery";
import { useTripsAndExpenses } from "./useTripsAndExpenses";
import { apiUrl } from "../../lib/api";
import {
  TravelFonts,
  StyledPage,
  StyledPageHeader,
  StyledHeaderInner,
  StyledHeaderTop,
  StyledTitleGroup,
  StyledHeaderActions,
  StyledStatsRow,
  StyledStat,
  StyledStatLabel,
  StyledStatValue,
  StyledStatDivider,
  StyledFiltersSection,
  StyledFiltersInner,
  StyledTripFilterContainer,
  StyledFilterLabel,
  StyledChip,
  StyledMain,
  StyledTotalsBar,
  StyledTotalCard,
  StyledTotalCardLabel,
  StyledTotalCardValue,
  StyledTableWrap,
  StyledExpenseTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableCell,
  StyledAvatarBadge,
  StyledCardList,
  StyledExpenseCard,
  StyledCardRow,
  StyledCardLabel,
  StyledCardValue,
  StyledBackButton,
  StyledSyncButton,
  StyledMessage,
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationInfo,
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
  const [selectedResponsible, setSelectedResponsible] = React.useState<string | null>(null);
  const isViewingAllTrips = selectedTrip === null;

  const dolarPesosExchange = selectedTrip?.dolarPesosExchange ?? 1;
  const dolarRealExchange = selectedTrip?.dolarRealExchange ?? 1;
  const round2 = (v: number) => Math.round(v * 100) / 100;
  const formatAmount = (value: number) => round2(value).toFixed(2);

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Intl.DateTimeFormat("es-AR", { timeZone: "UTC" }).format(new Date(date));
  };

  const formatTripDate = (date?: string | Date) => {
    if (!date) return "-";
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("es-AR", { timeZone: "UTC" });
  };

  const normalizeExchange = (v: string) =>
    v.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const getExchange = (exchange: string) => {
    const n = normalizeExchange(exchange);
    if (n.startsWith("pes") || n.startsWith("ars")) return "$";
    if (n.startsWith("dol") || n.startsWith("usd")) return "U$D";
    if (n.startsWith("rea") || n.startsWith("brl")) return "R$";
    return "-";
  };

  const getLocalCurrencyAmount = (amount: number, exchange: string) => {
    const n = normalizeExchange(exchange);
    return round2(
      n.startsWith("dol") || n.startsWith("usd") ? amount * dolarPesosExchange
      : n.startsWith("rea") || n.startsWith("brl") ? (amount / dolarRealExchange) * dolarPesosExchange
      : amount,
    );
  };

  const getDollarAmount = (amount: number, exchange: string) => {
    const n = normalizeExchange(exchange);
    return round2(
      n.startsWith("pes") || n.startsWith("ars") ? amount / dolarPesosExchange
      : n.startsWith("rea") || n.startsWith("brl") ? amount / dolarRealExchange
      : amount,
    );
  };

  const responsibles = Array.from(
    new Set(expenses.map((e) => e.responsible).filter(Boolean)),
  ).sort();

  const filteredExpenses = selectedResponsible
    ? expenses.filter((e) => e.responsible === selectedResponsible)
    : expenses;

  const expensesWithTotals = filteredExpenses.map((expense) => ({
    ...expense,
    displayExchange: getExchange(expense.exchange),
    localCurrencyAmount: getLocalCurrencyAmount(expense.amount, expense.exchange),
    dollarAmount: getDollarAmount(expense.amount, expense.exchange),
  }));

  const totals = expensesWithTotals.reduce(
    (acc, e) => ({
      localCurrencyAmount: round2(acc.localCurrencyAmount + e.localCurrencyAmount),
      dollarAmount: round2(acc.dollarAmount + e.dollarAmount),
    }),
    { localCurrencyAmount: 0, dollarAmount: 0 },
  );

  // Per-person dollar totals for the totals bar
  const perPerson: Record<string, number> = {};
  for (const e of expensesWithTotals) {
    if (e.responsible) {
      perPerson[e.responsible] = round2((perPerson[e.responsible] ?? 0) + e.dollarAmount);
    }
  }
  const personEntries = Object.entries(perPerson);
  const maxPayer = personEntries.length
    ? personEntries.reduce((a, b) => (a[1] > b[1] ? a : b))
    : null;
  const minPayer = personEntries.length > 1
    ? personEntries.reduce((a, b) => (a[1] < b[1] ? a : b))
    : null;
  const diff = maxPayer && minPayer ? round2(maxPayer[1] - minPayer[1]) : 0;

  const handleSyncClick = async () => {
    const confirmed = window.confirm("Esto va a reemplazar la BD con los datos actuales del Google Sheet. ¿Continuar?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/admin/sync-sheets"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        alert("Error: " + (data.message || "No se pudo importar desde Sheet"));
        return;
      }

      alert("BD actualizada desde Google Sheet.");
      await loadExpenses(1);
    } catch {
      alert("Cannot connect with server. Please try again later.");
    }
  };

  const handleExpenseAddedWithSyncRefresh = () => {
    handleAddExpense();
  };

  const renderCards = () => {
    return (
      <StyledCardList>
        {expensesWithTotals.map((expense) => (
          <StyledExpenseCard key={expense.id}>
            <StyledCardRow>
              <StyledCardLabel>Fecha</StyledCardLabel>
              <StyledCardValue className="accent">{formatDate(expense.date)}</StyledCardValue>
            </StyledCardRow>
            <StyledCardRow>
              <StyledCardLabel>Pagó</StyledCardLabel>
              <StyledCardValue>{expense.responsible}</StyledCardValue>
            </StyledCardRow>
            <StyledCardRow style={{ gridColumn: "1 / -1" }}>
              <StyledCardLabel>Descripción</StyledCardLabel>
              <StyledCardValue>{expense.type}</StyledCardValue>
            </StyledCardRow>
            <StyledCardRow>
              <StyledCardLabel>Monto</StyledCardLabel>
              <StyledCardValue>{expense.displayExchange} {formatAmount(expense.amount)}</StyledCardValue>
            </StyledCardRow>
            <StyledCardRow>
              <StyledCardLabel>Pesos</StyledCardLabel>
              <StyledCardValue className="muted">$ {formatAmount(expense.localCurrencyAmount)}</StyledCardValue>
            </StyledCardRow>
            <StyledCardRow>
              <StyledCardLabel>USD</StyledCardLabel>
              <StyledCardValue className="usd">U$D {formatAmount(expense.dollarAmount)}</StyledCardValue>
            </StyledCardRow>
          </StyledExpenseCard>
        ))}
      </StyledCardList>
    );
  };

  const renderTable = () => {
    if (loading) return <tbody><tr><td colSpan={6}><StyledMessage>Cargando gastos...</StyledMessage></td></tr></tbody>;
    if (expensesWithTotals.length === 0) return <tbody><tr><td colSpan={6}><StyledMessage>✈️ No hay gastos para mostrar.</StyledMessage></td></tr></tbody>;

    return (
      <tbody>
        {expensesWithTotals.map((expense) => (
          <StyledTableRow key={expense.id}>
            <StyledTableCell className="date">{formatDate(expense.date)}</StyledTableCell>
            <StyledTableCell className="desc">{expense.type}</StyledTableCell>
            <StyledTableCell className="responsible">
              <StyledAvatarBadge $name={expense.responsible ?? ""}>
                {expense.responsible?.[0]?.toUpperCase() ?? "?"}
              </StyledAvatarBadge>
              {expense.responsible}
            </StyledTableCell>
            <StyledTableCell className="amount">{expense.displayExchange} {formatAmount(expense.amount)}</StyledTableCell>
            <StyledTableCell className="pesos">$ {formatAmount(expense.localCurrencyAmount)}</StyledTableCell>
            <StyledTableCell className="usd">U$D {formatAmount(expense.dollarAmount)}</StyledTableCell>
          </StyledTableRow>
        ))}
      </tbody>
    );
  };

  return (
    <StyledPage>
      <TravelFonts />

      {/* ── HEADER ── */}
      <StyledPageHeader>
        <StyledHeaderInner>
          <StyledHeaderTop>
            <StyledTitleGroup>
              <h1>{isViewingAllTrips ? "Nuestros" : "Gastos de"} <em>viaje{isViewingAllTrips ? "s" : ""}</em></h1>
              <p>JULI & MATI - TRACKER PERSONAL 🛫</p>
              {selectedTrip && (
                <p>
                  {selectedTrip.destiny} · {formatTripDate(selectedTrip.startDate)} – {formatTripDate(selectedTrip.endDate)}
                </p>
              )}
              <p>Fuente de verdad: Google Sheet</p>
            </StyledTitleGroup>
            <StyledHeaderActions>
              <StyledBackButton onClick={() => router.push("/")}>← Volver</StyledBackButton>
              <StyledSyncButton onClick={handleSyncClick}>⟳ Importar desde Sheet</StyledSyncButton>
              <AddExpenseModal onAddExpense={handleExpenseAddedWithSyncRefresh} />
            </StyledHeaderActions>
          </StyledHeaderTop>

          {!isViewingAllTrips && (
            <StyledStatsRow>
              <StyledStat>
                <StyledStatLabel>Gastos</StyledStatLabel>
                <StyledStatValue>{expensesWithTotals.length}</StyledStatValue>
              </StyledStat>
              <StyledStatDivider />
              <StyledStat>
                <StyledStatLabel>Total USD</StyledStatLabel>
                <StyledStatValue $accent>U$D {formatAmount(totals.dollarAmount)}</StyledStatValue>
              </StyledStat>
              <StyledStatDivider />
              <StyledStat>
                <StyledStatLabel>Total Pesos</StyledStatLabel>
                <StyledStatValue>$ {formatAmount(totals.localCurrencyAmount)}</StyledStatValue>
              </StyledStat>
              {selectedTrip && (
                <>
                  <StyledStatDivider />
                  <StyledStat>
                    <StyledStatLabel>Dólar</StyledStatLabel>
                    <StyledStatValue>$ {formatAmount(selectedTrip.dolarPesosExchange)}</StyledStatValue>
                  </StyledStat>
                </>
              )}
            </StyledStatsRow>
          )}
          {isViewingAllTrips && (
            <StyledStatsRow>
              <StyledStat>
                <StyledStatLabel>Viajes</StyledStatLabel>
                <StyledStatValue>{trips.length}</StyledStatValue>
              </StyledStat>
            </StyledStatsRow>
          )}
        </StyledHeaderInner>
      </StyledPageHeader>

      {/* ── FILTERS ── */}
      <StyledFiltersSection>
        <StyledFiltersInner>
          <StyledTripFilterContainer>
            <StyledFilterLabel>Viaje</StyledFilterLabel>
            <StyledChip $active={selectedTrip === null} onClick={() => setSelectedTrip(null)}>
              Todos
            </StyledChip>
            {trips.map((trip) => (
              <StyledChip
                key={trip.id}
                $active={selectedTrip?.id === trip.id}
                onClick={() => setSelectedTrip(trip)}
              >
                {trip.destiny}
              </StyledChip>
            ))}
          </StyledTripFilterContainer>

          {!isViewingAllTrips && (
            <StyledTripFilterContainer>
              <StyledFilterLabel>Pagó</StyledFilterLabel>
              <StyledChip $active={selectedResponsible === null} $person onClick={() => setSelectedResponsible(null)}>
                Todos
              </StyledChip>
              {responsibles.map((r) => (
                <StyledChip key={r} $active={selectedResponsible === r} $person onClick={() => setSelectedResponsible(r)}>
                  {r}
                </StyledChip>
              ))}
            </StyledTripFilterContainer>
          )}
        </StyledFiltersInner>
      </StyledFiltersSection>

      {/* ── MAIN ── */}
      <StyledMain>
        {isViewingAllTrips ? (
          <TripsGallery trips={trips} expenses={expenses} onSelectTrip={setSelectedTrip} />
        ) : (
          <>
          {/* Totals bar */}
          <StyledTotalsBar>
          <StyledTotalCard>
            <StyledTotalCardLabel>Total USD</StyledTotalCardLabel>
            <StyledTotalCardValue $color="#d4a853">U$D {formatAmount(totals.dollarAmount)}</StyledTotalCardValue>
          </StyledTotalCard>
          {personEntries.map(([name, usd]) => (
            <StyledTotalCard key={name}>
              <StyledTotalCardLabel>{name} pagó</StyledTotalCardLabel>
              <StyledTotalCardValue $color={name.toLowerCase().startsWith("j") ? "#c4714a" : "#8a9e7e"}>
                U$D {formatAmount(usd)}
              </StyledTotalCardValue>
            </StyledTotalCard>
          ))}
          {maxPayer && minPayer && (
            <StyledTotalCard>
              <StyledTotalCardLabel>Diferencia</StyledTotalCardLabel>
              <StyledTotalCardValue style={{ fontSize: "14px", lineHeight: "1.4" }}>
                {minPayer[0]} le debe a {maxPayer[0]}<br />
                <span style={{ fontSize: "20px", fontWeight: 500 }}>U$D {formatAmount(diff)}</span>
              </StyledTotalCardValue>
            </StyledTotalCard>
          )}
        </StyledTotalsBar>

        {/* Cards (mobile) */}
        {renderCards()}

        {/* Table (desktop) */}
        <StyledTableWrap>
          <StyledExpenseTable>
            <thead>
              <tr>
                <StyledTableHeader>Fecha</StyledTableHeader>
                <StyledTableHeader>Descripción</StyledTableHeader>
                <StyledTableHeader>Pagado por</StyledTableHeader>
                <StyledTableHeader>Monto</StyledTableHeader>
                <StyledTableHeader>Pesos</StyledTableHeader>
                <StyledTableHeader>USD</StyledTableHeader>
              </tr>
            </thead>
            {renderTable()}
          </StyledExpenseTable>
        </StyledTableWrap>

        {/* Pagination */}
        <StyledPaginationContainer>
          <StyledPaginationButton disabled={!hasPrevPage} onClick={() => loadExpenses(currentPage - 1)}>
            ← Anterior
          </StyledPaginationButton>
          <StyledPaginationInfo>Mostrando {expenses.length} gastos</StyledPaginationInfo>
          <StyledPaginationButton disabled={!hasNextPage} onClick={() => loadExpenses(currentPage + 1)}>
            Siguiente →
          </StyledPaginationButton>
        </StyledPaginationContainer>
          </>
        )}
      </StyledMain>
    </StyledPage>
  );
};

export default ExpenseList;
