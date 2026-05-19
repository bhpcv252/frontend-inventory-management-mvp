"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Product, PaginatedResponse } from "@/types";
import ProductTable from "@/components/ProductTable";
import AdjustStockModal from "@/components/AdjustStockModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import Pagination from "@/components/Pagination";

export default function ProductsPage() {
  const [result, setResult] = useState<PaginatedResponse<Product> | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [adjustProduct, setAdjustProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .getProducts(page)
      .then(setResult)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, [page]);

  function handleStockUpdated(productId: string, updatedQty: number) {
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: prev.data.map((p) =>
          p.id === productId ? { ...p, quantityOnHand: updatedQty } : p,
        ),
      };
    });
  }

  function handleDeleted(productId: string) {
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: prev.data.filter((p) => p.id !== productId),
        total: prev.total - 1,
      };
    });
  }

  return (
    <div className="max-w-6xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {result
              ? `${result.total} product${result.total !== 1 ? "s" : ""}`
              : ""}
          </p>
        </div>
        <Link
          href="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors inline-flex items-center gap-1.5"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </Link>
      </div>

      {loading && <p className="text-gray-500 text-sm">Loading…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {result && !loading && (
        <>
          <ProductTable
            products={result.data}
            onAdjustStock={setAdjustProduct}
            onDelete={setDeleteProduct}
          />
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            onChange={setPage}
          />
        </>
      )}

      {adjustProduct && (
        <AdjustStockModal
          product={adjustProduct}
          onClose={() => setAdjustProduct(null)}
          onSuccess={handleStockUpdated}
        />
      )}

      {deleteProduct && (
        <ConfirmDeleteModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onSuccess={handleDeleted}
        />
      )}
    </div>
  );
}
