"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/types";

type Props = {
  product: Product;
  onClose: () => void;
  onSuccess: (productId: string) => void;
};

export default function ConfirmDeleteModal({
  product,
  onClose,
  onSuccess,
}: Props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setError("");
    setLoading(true);
    try {
      await api.deleteProduct(product.id);
      onSuccess(product.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="px-5 py-5">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-gray-900">
            Delete product?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-gray-700">{product.name}</span>{" "}
            will be removed from your inventory. This action can&apos;t be
            undone.
          </p>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">
              {error}
            </p>
          )}
        </div>

        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
