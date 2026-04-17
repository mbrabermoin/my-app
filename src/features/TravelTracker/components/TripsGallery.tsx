import React from "react";
import styled from "styled-components";

interface Trip {
  id: number;
  destiny: string;
  dolarRealExchange: number;
  dolarPesosExchange: number;
  startDate: string | Date;
  endDate: string | Date;
  paidBy: string;
}

interface TripsGalleryProps {
  trips: Trip[];
  expenses: Expense[];
  onSelectTrip: (trip: Trip) => void;
}

interface Expense {
  amount: number;
  exchange: string;
  travelId?: string | number | null;
}

const terracotta = "#c4714a";
const deep = "#1a1410";
const muted = "#9c8b79";

const StyledTripsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledTripCard = styled.button`
  background: white;
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: left;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(196, 113, 74, 0.18);
    border-color: ${terracotta};
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const StyledTripCardTitle = styled.h3`
  margin: 0 0 12px 0;
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: ${deep};
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const StyledTripCardDate = styled.p`
  margin: 0 0 16px 0;
  font-size: 13px;
  color: ${muted};
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const StyledTripCardExchanges = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  > :nth-child(4) {
    grid-column: 1 / 2;
  }

  > :nth-child(5) {
    grid-column: 2 / 3;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    > :nth-child(4),
    > :nth-child(5) {
      grid-column: auto;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StyledExchangeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledExchangeLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${muted};
  font-weight: 600;
`;

const StyledExchangeValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${terracotta};
`;

const TripsGallery: React.FC<TripsGalleryProps> = ({ trips, expenses, onSelectTrip }) => {
  const toFiniteNumber = (value: unknown) => {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  };

  const formatTripDate = (date?: string | Date) => {
    if (!date) return "-";
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("es-AR", { timeZone: "UTC" });
  };

  const normalizeExchange = (value: string) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const totalsByTrip = React.useMemo(() => {
    const totalsMap: Record<string, { pesos: number; reales: number; dolares: number }> = {};

    for (const expense of expenses) {
      const tripKey = String(expense.travelId || "");
      if (!tripKey) continue;

      if (!totalsMap[tripKey]) {
        totalsMap[tripKey] = { pesos: 0, reales: 0, dolares: 0 };
      }

      const amount = toFiniteNumber(expense.amount);
      if (amount === 0) continue;

      const exchange = normalizeExchange(expense.exchange);
      if (exchange.startsWith("rea") || exchange.startsWith("brl")) {
        totalsMap[tripKey].reales += amount;
      } else if (exchange.startsWith("dol") || exchange.startsWith("usd")) {
        totalsMap[tripKey].dolares += amount;
      } else {
        totalsMap[tripKey].pesos += amount;
      }
    }

    return totalsMap;
  }, [expenses]);

  const round2 = (value: number) => Math.round(toFiniteNumber(value) * 100) / 100;
  const formatAmount = (value: number) => round2(value).toFixed(2);

  if (trips.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <p style={{ color: muted, fontSize: "14px" }}>No hay viajes disponibles</p>
      </div>
    );
  }

  return (
    <StyledTripsContainer>
      {trips.map((trip) => {
        const totals = totalsByTrip[String(trip.id)] || {
          pesos: 0,
          reales: 0,
          dolares: 0,
        };

        const dollarToPesosRate = toFiniteNumber(trip.dolarPesosExchange);
        const dollarToRealRate = toFiniteNumber(trip.dolarRealExchange);

        const totalInDollars =
          totals.dolares +
          (dollarToPesosRate > 0 ? (totals.pesos / dollarToPesosRate) : 0) +
          (dollarToRealRate > 0 ? (totals.reales / dollarToRealRate) : 0);

        const totalInPesos =
          totals.pesos +
          (dollarToPesosRate > 0 ? (totals.dolares * dollarToPesosRate) : 0) +
          (dollarToRealRate > 0 && dollarToPesosRate > 0
            ? ((totals.reales / dollarToRealRate) * dollarToPesosRate)
            : 0);

        return (
          <StyledTripCard key={trip.id} onClick={() => onSelectTrip(trip)}>
            <StyledTripCardTitle>{trip.destiny}</StyledTripCardTitle>
            <StyledTripCardDate>
              {formatTripDate(trip.startDate)} – {formatTripDate(trip.endDate)}
            </StyledTripCardDate>
            <StyledTripCardExchanges>
              <StyledExchangeItem>
                <StyledExchangeLabel>Gastos en pesos:</StyledExchangeLabel>
                <StyledExchangeValue>$ {formatAmount(totals.pesos)}</StyledExchangeValue>
              </StyledExchangeItem>
              <StyledExchangeItem>
                <StyledExchangeLabel>Gastos en reales:</StyledExchangeLabel>
                <StyledExchangeValue>R$ {formatAmount(totals.reales)}</StyledExchangeValue>
              </StyledExchangeItem>
              <StyledExchangeItem>
                <StyledExchangeLabel>Gastos en Dolares:</StyledExchangeLabel>
                <StyledExchangeValue>U$D {formatAmount(totals.dolares)}</StyledExchangeValue>
              </StyledExchangeItem>
              <StyledExchangeItem>
                <StyledExchangeLabel>Total en Pesos:</StyledExchangeLabel>
                <StyledExchangeValue>$ {formatAmount(totalInPesos)}</StyledExchangeValue>
              </StyledExchangeItem>
              <StyledExchangeItem>
                <StyledExchangeLabel>Total en Dolares:</StyledExchangeLabel>
                <StyledExchangeValue>U$D {formatAmount(totalInDollars)}</StyledExchangeValue>
              </StyledExchangeItem>
            </StyledTripCardExchanges>
          </StyledTripCard>
        );
      })}
    </StyledTripsContainer>
  );
};

export default TripsGallery;
