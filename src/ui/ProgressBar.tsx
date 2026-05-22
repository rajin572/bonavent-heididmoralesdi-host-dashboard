/* eslint-disable @typescript-eslint/no-explicit-any */
const ProgressBar = ({
  title,
  value,
  label,
  barColor = "bg-blue-500",
  unit = "%",
}: any) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-base-color">{title}</span>
        <span className="text-sm font-semibold text-base-color">
          <span className="text-[#4A5565]">{value}</span>
          {unit}
        </span>
      </div>

      <div className="w-full h-5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${value}${unit === "%" ? "%" : ""}` }}
        />
      </div>

      <p className="text-xs text-[#6A7282] mt-2">{label}</p>
    </div>
  );
};

export default ProgressBar;
