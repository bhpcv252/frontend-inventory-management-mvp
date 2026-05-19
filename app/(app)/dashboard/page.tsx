"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { DashboardResponse } from "@/types";
import StatsCard from "@/components/StatsCard";
import LowStockTable from "@/components/LowStockTable";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDashboard()
      .then(setData)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!data) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            label="Total Products"
            value={data.totalProducts}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                />
              </svg>
            }
          />
          <StatsCard
            label="Total Units in Stock"
            value={data.totalQuantity}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Low Stock Alerts
          </h2>
          {data.lowStockItems.length > 0 && (
            <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
              {data.lowStockItems.length} item
              {data.lowStockItems.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <LowStockTable items={data.lowStockItems} />
      </div>
    </div>
  );
}
