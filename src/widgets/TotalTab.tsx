import React from "react";
import { GroupKey, GROUPS } from "../shared/store/useQualityStore";
import { useQualityStore } from "../shared/store/useQualityStore";
import { calcResultIndex } from "../entities/quality/calc";
import RadarModal from "./RadarModal";

export default function TotalTab() {
  const cfg = GROUPS;
  const groupResults = useQualityStore((s) => s.groupResults);
  const groupWeights = useQualityStore((s) => s.groupWeights);
  const setGroupWeight = useQualityStore((s) => s.setGroupWeight);
  const resetAll = useQualityStore((s) => s.resetAll);

  const [result, setResult] = React.useState<number | null>(null);
  const [radarOpen, setRadarOpen] = React.useState<boolean>(false);
  const openRadar = () => setRadarOpen(true);
  const closeRadar = () => setRadarOpen(false);

  const radarData = React.useMemo(() => {
    return Object.keys(groupResults).map((keyResult) => ({
      name: GROUPS[keyResult as GroupKey].title,
      value: groupResults[keyResult as GroupKey]!,
    }));
  }, [groupResults]);

  const handleResult = () => {
    const idx = calcResultIndex(groupResults, groupWeights);
    setResult(idx);
  };

  const handleReset = () => {
    resetAll();
    setResult(null);
  };

  function allFilled(groupResults: Record<GroupKey, number | null>): boolean {
    return Object.values(groupResults).every((res) => Number.isFinite(res));
  }

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
                min={0}
                max={1}
                step={0.1}
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
          className={`px-4 py-2 text-white rounded cursor-pointer
            ${
              allFilled(groupResults)
                ? "bg-blue-600  hover:bg-blue-700 active:bg-blue-800 transition"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          onClick={handleResult}
          disabled={!allFilled(groupResults)}
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
        <button
          className={`px-4 py-2 rounded text-white cursor-pointer
            ${
              allFilled(groupResults)
                ? "bg-purple-600  hover:bg-purple-700 active:bg-purple-800 transition"
                : "bg-purple-300 cursor-not-allowed"
            } `}
          disabled={!allFilled(groupResults)}
          onClick={openRadar}
        >
          Сделать радарную диаграмму
        </button>
      </div>

      <div className="mt-3">
        <span className="font-medium">Результат:</span>{" "}
        {result === null ? "" : result.toFixed(2)}
      </div>

      {radarOpen && <RadarModal closeRadar={closeRadar} data={radarData} />}
    </section>
  );
}
