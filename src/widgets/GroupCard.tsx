import React from "react";
import {
  GROUPS,
  GroupKey,
  useQualityStore,
} from "../shared/store/useQualityStore";
import InputRow from "../shared/ui/InputRow";
import { calcGroupIndex } from "../entities/quality/calc";
import ExpertWeightsModal from "./ExpertWeightsModal";

export default function GroupCard({ group }: { group: GroupKey }) {
  const cfg = GROUPS[group];

  const groupInputs = useQualityStore((s) => s.inputs[group]);
  const groupWeights = useQualityStore((s) => s.weights[group]);
  const groupResult = useQualityStore((s) => s.groupResults[group]);
  const setInput = useQualityStore((s) => s.setInput);
  const setGroupResult = useQualityStore((s) => s.setGroupResult);
  const resetGroup = useQualityStore((s) => s.resetGroup);

  const [expertsOpen, setExpertsOpen] = React.useState<boolean>(false);
  const openExperts = () => setExpertsOpen(true);
  const closeExperts = () => setExpertsOpen(false);

  const handleCalc = () => {
    const idx = calcGroupIndex(group, groupInputs, groupWeights);
    setGroupResult(group, idx);
  };

  const handleReset = () => {
    resetGroup(group);
    setGroupResult(group, null);
  };

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
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white
          cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition"
          onClick={handleCalc}
        >
          Рассчитать
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-200
          cursor-pointer hover:bg-gray-300 active:bg-gray-400 transition"
          onClick={handleReset}
        >
          Сбросить
        </button>
        <button
          className="px-4 py-2 rounded bg-emerald-100 text-emerald-700
          cursor-pointer hover:bg-emerald-200 active:bg-emerald-300 transition"
          onClick={openExperts}
        >
          Добавить оценки экспертов
        </button>
      </div>

      {expertsOpen && (
        <ExpertWeightsModal group={group} onClose={closeExperts} />
      )}

      <div className="mt-3">
        <span className="font-medium">Результат:</span>{" "}
        {groupResult === null ? "" : groupResult.toFixed(2)}
      </div>
    </section>
  );
}
