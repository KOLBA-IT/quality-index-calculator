type Props = {
  label: string;
  unit?: string;
  value: number | "";
  onChange: (v: number | "") => void;
  placeholder?: string;
  min?: number;
  max?: number;
};

export default function InputRow({
  label,
  unit,
  value,
  onChange,
  placeholder,
  min,
  max,
}: Props) {
  return (
    <label className="flex flex-col gap-1 mb-3">
      <span>
        {label}
        {unit ? `, ${unit}` : ""}
      </span>
      <input
        required
        type="number"
        inputMode="decimal"
        className="border rounded px-3 py-2"
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
    </label>
  );
}
