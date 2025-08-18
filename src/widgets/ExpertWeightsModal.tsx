import React from "react";
import { GroupKey, GROUPS } from "../shared/store/useQualityStore";

export default function ExpertWeightsModal({
  group,
  onClose,
}: {
  group: GroupKey;
  onClose: () => void;
}) {
  const cfg = GROUPS[group];
  const [countExperts, setCountExperts] = React.useState<number>(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-4 w-[min(600px,95vw)]">
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
      </div>
    </div>
  );
}
