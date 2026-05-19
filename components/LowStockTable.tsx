type LowStockItem = {
  id: string;
  name: string;
  sku: string;
  quantityOnHand: number;
  effectiveThreshold: number;
};

type Props = {
  items: LowStockItem[];
};

export default function LowStockTable({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700">All stocked up</p>
        <p className="text-sm text-gray-500 mt-0.5">
          No low stock items right now.
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
              Threshold
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={item.id}
              className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                {item.sku}
              </td>
              <td className="px-4 py-3 text-right">
                <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
                  {item.quantityOnHand}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-500">
                {item.effectiveThreshold}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
