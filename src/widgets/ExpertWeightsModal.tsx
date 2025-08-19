import React from "react";
import {
  GroupKey,
  GROUPS,
  useQualityStore,
} from "../shared/store/useQualityStore";

export default function ExpertWeightsModal({
  group,
  onClose,
}: {
  group: GroupKey;
  onClose: () => void;
}) {
  const cfg = GROUPS[group];

  const [countExperts, setCountExperts] = React.useState<number>(3);
  const [scores, setScores] = React.useState<Array<Array<number | "">>>(() =>
    GROUPS[group].fields.map(() =>
      Array.from({ length: countExperts }, () => "" as const),
    ),
  );
  const [W, setW] = React.useState<number>(-1);

  React.useEffect(() => {
    setScores((prev) =>
      GROUPS[group].fields.map((_, i) => {
        const row = prev[i] ?? [];
        const next = Array.from(
          { length: countExperts },
          (_, k) => row[k] ?? "",
        );
        return next;
      }),
    );
  }, [group, countExperts]);

  React.useEffect(() => {
    if (!allFilled(scores)) {
      setW(-1);
      return;
    }
    setW(computeW(scores));
  }, [scores]);

  const updateCell = (i: number, k: number, v: string) => {
    setScores((prev) => {
      const next = prev.map((row) => row.slice());
      next[i][k] = v === "" ? "" : Number(v);
      return next;
    });
  };

  const computeWeights = () => {
    const rowSums = scores.map((row) =>
      row.reduce<number>(
        (acc, cell) => (typeof cell === "number" ? cell : 0) + acc,
        0,
      ),
    );
    const total = rowSums.reduce((acc, cell) => acc + cell, 0);

    const weights: Record<string, number> = {};
    GROUPS[group].fields.map((f, i) => {
      weights[f.key] = rowSums[i] / total;
    });
    return weights;
  };

  function allFilled(scores: Array<Array<number | "">>): boolean {
    return scores.every((row) => row.every((cell) => typeof cell === "number"));
  }

  function computeW(scores: Array<Array<number | "">>): number {
    const m = scores[0]?.length ?? 0;
    const l = scores.length;

    const rowSums = scores.map((row) =>
      row.reduce<number>(
        (acc, cell) => (typeof cell === "number" ? cell : 0) + acc,
        0,
      ),
    );
    const R = ((l + 1) * m) / 2;
    const S = rowSums.reduce((acc, cell) => acc + (cell - R) ** 2);
    const W = (12 * S) / (m ** 2 * (l ** 3 - l));

    return W;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-4 w-[min(700px,95vw)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">
            Оценки экспертов — {cfg.title}
          </h3>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
          >
            Закрыть
          </button>
        </div>

        <div className="mb-3">
          <div className="flex gap-2 items-center">
            <span>Количество экспертов</span>
            <input
              type="number"
              min={1}
              max={10}
              className="border rounded px-2 py-1 w-24"
              value={countExperts}
              onChange={(e) => {
                const m = Number(e.target.value);
                if (!Number.isFinite(m)) return;
                setCountExperts(Math.max(1, Math.min(10, Math.trunc(m))));
              }}
            />
          </div>
        </div>

        <div className="overflow-auto mt-3">
          <table className="min-w-full  border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border border-gray-200 text-left">
                  Показатель
                </th>
                {Array.from({ length: countExperts }).map((_, k) => (
                  <th
                    className="p-2 border border-gray-200 text-center"
                    key={k}
                  >
                    Эксперт {k + 1}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {GROUPS[group].fields.map((f, i) => (
                <tr key={f.key}>
                  <td className="p-2 border border-gray-200">{f.label}</td>
                  {Array.from({ length: countExperts }).map((_, k) => (
                    <td className="p-2 border border-gray-200" key={k}>
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-24"
                        min={0}
                        value={scores[i]?.[k] === "" ? "" : scores[i]?.[k]}
                        onChange={(e) => updateCell(i, k, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex">
          <button
            className={`mt-4 px-4 py-2 rounded text-white transition
              ${
                W === null || W <= 0.5
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
              }`}
            disabled={W <= 0.5}
            onClick={() => {
              const w = computeWeights();
              useQualityStore.getState().setIndicatorWeights(group, w);
              onClose();
            }}
          >
            Применить
          </button>
          <span className="mt-4 px-4 py-2 font-medium">
            Коэффициент конкордации W:{" "}
            {W === -1 ? "" : W > 1 ? 1 : W.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
