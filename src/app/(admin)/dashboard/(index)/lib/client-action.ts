"use client";

export const fetchOrderChart = async (range: string) => {
  const res = await fetch(`/api/analytics/chart?range=${range}`);
  if (!res.ok) throw new Error("Failed to fetch chart data");
  return res.json();
};

export const fetchDashboardCards = async () => {
  const res = await fetch("/api/analytics/cards");
  if (!res.ok) throw new Error("Failed to fetch dashboard summary");
  return res.json();
};
