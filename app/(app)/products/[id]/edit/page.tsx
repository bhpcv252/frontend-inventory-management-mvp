"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { api } from "@/lib/api";
import type { Product, UpdateProductPayload } from "@/types";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getProduct(id)
      .then(setProduct)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load product"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: UpdateProductPayload) {
    await api.updateProduct(id, data);
    router.push("/products");
  }

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to products
        </button>
        <h2 className="text-lg font-semibold text-gray-900 mt-3">
          Edit product
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
            {product.sku}
          </span>{" "}
          · Qty on hand: <strong>{product.quantityOnHand}</strong>
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <ProductForm
          mode="edit"
          initial={product}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/products")}
        />
      </div>
    </div>
  );
}
