"use client";

import { useState } from "react";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types";

type CreateMode = {
  mode: "create";
  onSubmit: (data: CreateProductPayload) => Promise<void>;
};

type EditMode = {
  mode: "edit";
  initial: Product;
  onSubmit: (data: UpdateProductPayload) => Promise<void>;
};

type Props = (CreateMode | EditMode) & {
  onCancel: () => void;
};

export default function ProductForm(props: Props) {
  const initial = props.mode === "edit" ? props.initial : null;

  const [name, setName] = useState(initial?.name ?? "");
  const [sku, setSku] = useState(initial?.sku ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [initialQuantity, setInitialQuantity] = useState("0");
  const [costPrice, setCostPrice] = useState(
    initial?.costPrice != null ? String(initial.costPrice) : "",
  );
  const [sellingPrice, setSellingPrice] = useState(
    initial?.sellingPrice != null ? String(initial.sellingPrice) : "",
  );
  const [lowStockThreshold, setLowStockThreshold] = useState(
    initial?.lowStockThreshold != null ? String(initial.lowStockThreshold) : "",
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const base = {
        name: name.trim(),
        sku: sku.trim(),
        description: description.trim() || undefined,
        costPrice: costPrice !== "" ? parseFloat(costPrice) : undefined,
        sellingPrice:
          sellingPrice !== "" ? parseFloat(sellingPrice) : undefined,
        lowStockThreshold:
          lowStockThreshold !== "" ? parseInt(lowStockThreshold) : undefined,
      };

      if (props.mode === "create") {
        await props.onSubmit({
          ...base,
          initialQuantity:
            initialQuantity !== "" ? parseInt(initialQuantity) : undefined,
        });
      } else {
        await props.onSubmit(base);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="Blue Widget"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-mono"
            placeholder="WDGT-BLUE-001"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm resize-none"
            placeholder="Optional description…"
          />
        </div>

        {props.mode === "create" && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Quantity
            </label>
            <input
              type="number"
              value={initialQuantity}
              onChange={(e) => setInitialQuantity(e.target.value)}
              min="0"
              step="1"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              This creates the first stock movement
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              min="0"
              step="0.01"
              className="border border-gray-300 rounded-lg pl-7 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selling Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              min="0"
              step="0.01"
              className="border border-gray-300 rounded-lg pl-7 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Low Stock Threshold
          </label>
          <input
            type="number"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(e.target.value)}
            min="0"
            step="1"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="e.g. 10"
          />
        </div>
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
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors"
        >
          {loading
            ? "Saving…"
            : props.mode === "create"
              ? "Create product"
              : "Save changes"}
        </button>
        <button
          type="button"
          onClick={props.onCancel}
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
