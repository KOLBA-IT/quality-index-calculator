import { GroupKey, GROUPS } from "./shared/store/useQualityStore";
import GroupCard from "./pages/Calculator/GroupCard";

export default function App() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Калькулятор индекса качества ЦСМК
      </h1>
      {(Object.keys(GROUPS) as GroupKey[]).map((group) => (
        <GroupCard key={group} group={group} />
      ))}
    </main>
  );
}
