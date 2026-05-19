"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/types";

type Props = {
  product: Product;
  onClose: () => void;
  onSuccess: (productId: string, updatedQty: number) => void;
};

export default function AdjustStockModal({
  product,
  onClose,
  onSuccess,
}: Props) {
  const [delta, setDelta] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const deltaNum = parseInt(delta);
    if (isNaN(deltaNum) || deltaNum === 0) {
      setError("Delta must be a non-zero number");
      return;
    }

    setLoading(true);
    try {
      const key = crypto.randomUUID();
      const res = await api.adjustStock(
        product.id,
        {
          delta: deltaNum,
          note: note.trim() || undefined,
          idempotencyKey: key,
        },
        key,
      );
      onSuccess(product.id, res.updatedQuantityOnHand);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to adjust stock");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Adjust Stock
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Current qty */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <span className="text-xs text-gray-500">Current quantity: </span>
          <span className="text-sm font-semibold text-gray-900">
            {product.quantityOnHand}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Change (+/-)
            </label>
            <input
              type="number"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              required
              step="1"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="e.g. 20 or -5"
            />
            <p className="text-xs text-gray-400 mt-1">
              Positive to add stock, negative to remove
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="e.g. Restocked from supplier"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors"
            >
              {loading ? "Saving…" : "Apply adjustment"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
