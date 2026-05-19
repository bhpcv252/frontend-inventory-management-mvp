type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-3">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>
      <span className="text-sm text-gray-500">
        Page <span className="font-medium text-gray-900">{page}</span> of{" "}
        <span className="font-medium text-gray-900">{totalPages}</span>
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
