import React from "react";
import { GroupKey, GROUPS } from "../shared/store/useQualityStore";
import { useQualityStore } from "../shared/store/useQualityStore";
import { calcResultIndex } from "../entities/quality/calc";

export default function TotalTab() {
  const cfg = GROUPS;
  const groupResults = useQualityStore((s) => s.groupResults);
  const groupWeights = useQualityStore((s) => s.groupWeights);
  const setGroupWeight = useQualityStore((s) => s.setGroupWeight);
  const resetAll = useQualityStore((s) => s.resetAll);

  const [result, setResult] = React.useState<number | null>(null);

  const handleResult = () => {
    const idx = calcResultIndex(groupResults, groupWeights);
    setResult(idx);
  };

  const handleReset = () => {
    resetAll();
    setResult(null);
  };

  return (
    <section className="border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Общий индекс качества цифровой СМК
      </h3>
      <div className="flex justify-between my-2 border-b-1">
        <span className="font-semibold">Название индекса</span>
        <div className="flex w-1/3 justify-between">
          <span className="font-semibold">Значение</span>
          <span className="w-25 font-semibold">Вес</span>
        </div>
      </div>
      <div className="flex-row">
        {Object.entries(cfg).map(([group, groupCfg]) => (
          <div className="flex justify-between my-1" key={groupCfg.title}>
            <div className="flex items-center">{groupCfg.title}</div>
            <div className="flex w-1/3 justify-between">
              <div className="flex items-center justify-center w-25 rounded bg-gray-200 text-gray-400">
                {groupResults[group as GroupKey]?.toFixed(2) ?? ""}
              </div>
              <input
                required
                type="number"
                inputMode="decimal"
                className="px-3 py-2 rounded border w-25"
                placeholder="0.2"
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setGroupWeight(group as GroupKey, null);
                    return;
                  }
                  setGroupWeight(group as GroupKey, Number(raw));
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white
          cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition"
          onClick={handleResult}
        >
          Рассчитать
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-200
          cursor-pointer hover:bg-gray-300 active:bg-gray-400 transition"
          onClick={handleReset}
        >
          Сбросить всё
        </button>
      </div>

      <div className="mt-3">
        <span className="font-medium">Результат:</span>{" "}
        {result === null ? "" : result.toFixed(2)}
      </div>
    </section>
  );
}
