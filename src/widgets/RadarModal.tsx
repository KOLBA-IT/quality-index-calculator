import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import React from "react";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

type RadarPoint = { name: string; value: number };

export default function RadarModal({
  closeRadar,
  data,
}: {
  closeRadar: () => void;
  data: RadarPoint[];
}) {
  const chartWrapperRef = React.useRef<HTMLDivElement | null>(null);

  const handleSVG = async () => {
    try {
      const svg = chartWrapperRef?.current?.querySelector("svg");
      if (!svg) {
        alert("Не удалось найти SVG внутри диаграммы");
        return;
      }

      const cloned = svg.cloneNode(true) as SVGSVGElement;
      cloned.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      cloned.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

      const xml = new XMLSerializer().serializeToString(cloned);
      const svgText = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;

      const path = await save({
        title: "Сохранить диаграмму",
        filters: [{ name: "SVG", extensions: ["svg"] }],
      });
      if (!path) return;

      await writeTextFile(path, svgText);
    } catch (e) {
      console.log(e);
      alert("Ошибка при сохранении диаграммы");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-4 w-[min(700px,95vw)]">
        <h3 className="text-lg font-semibold">Радарная диаграмма ЦСМК</h3>

        <div ref={chartWrapperRef} className="mt-3 w-full h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid />
              <PolarAngleAxis
                dataKey="name"
                tickFormatter={(v: string) => v.slice(-4, -1)}
              />
              <PolarRadiusAxis
                domain={[0, 1]}
                tickCount={5}
                angle={90}
                tick={{ fill: "#374151" }}
              />
              <Tooltip formatter={(v: number) => v.toFixed(2)} />
              <Radar
                dataKey="value"
                stroke="#4f46e5"
                fill="#6366f1"
                fillOpacity={0.45}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={closeRadar}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
          >
            Закрыть
          </button>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white 
                        cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition"
            onClick={handleSVG}
          >
            Сохранить (SVG)
          </button>
        </div>
      </div>
    </div>
  );
}
