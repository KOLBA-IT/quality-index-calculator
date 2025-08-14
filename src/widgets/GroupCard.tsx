//import React from "react";
import {
  GROUPS,
  GroupKey,
  useQualityStore,
} from "../shared/store/useQualityStore";
import InputRow from "../shared/ui/InputRow";

export default function GroupCard({ group }: { group: GroupKey }) {
  const cfg = GROUPS[group];

  const groupInputs = useQualityStore((s) => s.inputs[group]);
  const groupWeights = useQualityStore((s) => s.weights[group]);
  const setInput = useQualityStore((s) => s.setInput);

  //const [groupResult, setGroupResult] = React.useState<number | null>(null);

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
          weight={groupWeights[f.key]}
          onChange={(v) => setInput(group, f.key, v)}
        />
      ))}

      <div className="flex gap-2 mt-2">
        <button className="px-4 py-2 rounded bg-blue-600 text-white">
          Рассчитать
        </button>
        <button className="px-4 py-2 rounded bg-gray-200">Сбросить</button>
        <button className="px-4 py-2 rounded bg-emerald-100 text-emerald-700">
          Добавить оценки экспертов
        </button>
      </div>

      <div className="mt-3">
        <span className="font-medium">Результат:</span>{" "}
        {/* {groupResult == null ? "" : groupResult} */}
      </div>
    </section>
  );
}
