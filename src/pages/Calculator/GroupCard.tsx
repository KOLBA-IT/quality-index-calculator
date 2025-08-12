import {
  GROUPS,
  GroupKey,
  useQualityStore,
} from "../../shared/store/useQualityStore";
import InputRow from "../../shared/ui/InputRow";

export default function GroupCard({ group }: { group: GroupKey }) {
  const cfg = GROUPS[group];

  const groupInputs = useQualityStore((s) => s.inputs[group]);

  const setInput = useQualityStore((s) => s.setInput);

  return (
    <section className="border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">{cfg.title}</h3>
      {cfg.fields.map((f) => (
        <InputRow
          key={f.key}
          min={f.min}
          max={f.max}
          label={f.label}
          unit={f.unit}
          placeholder={f.placeholder}
          value={groupInputs[f.key] ?? ""}
          onChange={(v) => setInput(group, f.key, v)}
        />
      ))}
    </section>
  );
}
