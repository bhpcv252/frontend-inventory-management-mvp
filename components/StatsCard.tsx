type StatsCardProps = {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
};

export default function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-1.5 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon && (
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
