type Props = {
  label: string;
  unit?: string;
  value: number | "";
  onChange: (v: number | "") => void;
  placeholder?: string;
};

export default function InputRow({
  label,
  unit,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <label className="flex flex-col gap-1 mb-3">
      <span>
        {label}
        {unit ? `, ${unit}` : ""}
      </span>
      <input
        type="number"
        inputMode="decimal"
        className="border rounded px-3 py-2"
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
