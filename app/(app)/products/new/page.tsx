"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { api } from "@/lib/api";
import type { CreateProductPayload } from "@/types";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSubmit(data: CreateProductPayload) {
    await api.createProduct(data);
    router.push("/products");
  }

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
          Add a new product
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Fill in the details below to add a product to your inventory.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <ProductForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.push("/products")}
        />
      </div>
    </div>
  );
}
