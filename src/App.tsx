import { useQualityStore } from "./shared/store/useQualityStore";
import GroupCard from "./pages/Calculator/GroupCard";

export default function App() {
  // Читаем веса групп и экшн их изменения
  const groupWeights = useQualityStore((s) => s.groupWeights);
  const setGroupWeight = useQualityStore((s) => s.setGroupWeight);

  // Читаем все введённые значения
  const inputs = useQualityStore((s) => s.inputs);

  const handleCheck = () => {
    console.log("Все значения:", inputs);
    console.log("Веса групп:", groupWeights);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Тест приложения</h1>

      {/* Блок редактирования весов групп */}
      <div className="border rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Веса групп</h2>
        {Object.entries(groupWeights).map(([group, weight]) => (
          <label key={group} className="flex items-center gap-2 mb-2">
            <span className="w-16">{group}</span>
            <input
              type="number"
              step="0.01"
              value={weight}
              onChange={(e) => setGroupWeight(group, Number(e.target.value))}
              className="border rounded px-2 py-1 w-24"
            />
          </label>
        ))}
      </div>

      {/* Карточка для группы IRP */}
      <GroupCard group="IRP" />

      {/* Кнопка проверки */}
      <button
        onClick={handleCheck}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Проверить (лог в консоль)
      </button>
    </div>
  );
}
