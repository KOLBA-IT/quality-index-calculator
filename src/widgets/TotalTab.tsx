import { GROUPS } from "../shared/store/useQualityStore";
//import { useQualityStore } from "../shared/store/useQualityStore";

export default function TotalTab() {
  const cfg = GROUPS;
  //const groupWeights = useQualityStore((s) => s.groupWeights);

  return (
    <section className="border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Общий индекс качества цифровой СМК
      </h3>
      <div className="flex-row gap-">
        {Object.values(cfg).map((groupCfg) => (
          <div className="flex justify-between my-1" key={groupCfg.title}>
            {groupCfg.title}
            <input
              type="number"
              className="w-15 rounded bg-gray-200 text-gray-400"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
