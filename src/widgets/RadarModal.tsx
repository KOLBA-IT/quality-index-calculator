type RadarPoint = { name: string; value: number };

export default function RadarModal({
  closeRadar,
  data,
}: {
  closeRadar: () => void;
  data: RadarPoint[];
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-4 w-[min(700px,95vw)]">
        <h3 className="text-lg font-semibold">Радарная диаграмма ЦСМК</h3>

        <div>{data[0].name}</div>

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
          >
            Сохранить (SVG)
          </button>
        </div>
      </div>
    </div>
  );
}
