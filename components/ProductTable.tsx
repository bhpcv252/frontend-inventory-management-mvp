"use client";

import Link from "next/link";
import type { Product } from "@/types";

type Props = {
  products: Product[];
  onAdjustStock: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductTable({
  products,
  onAdjustStock,
  onDelete,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
        <p className="text-sm text-gray-500">
          No products yet. Add your first product to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">
              Name
            </th>
            <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">
              SKU
            </th>
            <th className="text-right px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">
              Qty on Hand
            </th>
            <th className="text-right px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">
              Selling Price
            </th>
            <th className="text-right px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isLowStock =
              product.lowStockThreshold != null
                ? product.quantityOnHand <= product.lowStockThreshold
                : product.quantityOnHand === 0;

            return (
              <tr
                key={product.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                    {isLowStock && (
                      <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
                        Low stock
                      </span>
                    )}
                  </div>
                  {product.description && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
                      {product.description}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {product.sku}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`font-semibold ${isLowStock ? "text-red-600" : "text-gray-900"}`}
                  >
                    {product.quantityOnHand}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {product.sellingPrice != null ? (
                    `$${product.sellingPrice.toFixed(2)}`
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onAdjustStock(product)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-blue-200 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                    >
                      Adjust
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-red-200 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
