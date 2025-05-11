"use client";

export const fetchOrderChart = async (from?: Date, to?: Date) => {
  const params = new URLSearchParams();
  if (from) params.append("from", from.toISOString());
  if (to) params.append("to", to.toISOString());

  const res = await fetch(`/api/analytics/chart?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch chart data");
  return res.json();
};

export const fetchDashboardCardsReport = async (from?: Date, to?: Date) => {
  const params = new URLSearchParams();
  if (from) params.append("from", from.toISOString());
  if (to) params.append("to", to.toISOString());

  const res = await fetch(`/api/analytics/report?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch dashboard summary");
  return res.json();
};

export const fetchDashboardCards = async () => {
  const res = await fetch("/api/analytics/cards");
  if (!res.ok) throw new Error("Failed to fetch dashboard summary");
  return res.json();
};
