type Props = {
  label: string;
  unit?: string;
  value: number | "";
  weight: number;
  onChange: (v: number | "") => void;
  placeholder?: string;
  min?: number;
  max?: number;
};

export default function InputRow({
  label,
  unit,
  value,
  weight,
  onChange,
  placeholder,
  min,
  max,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between">
        <span className="text-sm">
          {label}
          {unit ? `, ${unit}` : ""}
        </span>
        <span className="text-sm w-13">Вес:</span>
      </div>

      <div className="flex gap-3">
        <input
          required
          type="number"
          inputMode="decimal"
          className="px-3 py-2 rounded border w-full"
          min={min}
          max={max}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange("");
              return;
            }
            onChange(Number(raw));
          }}
        />
        <div className="flex items-center justify-center w-15 rounded bg-gray-200 text-gray-400">
          {weight.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
