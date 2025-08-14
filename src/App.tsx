import React from "react";
import { GroupKey } from "./shared/store/useQualityStore";
import Tabs, { TabKey } from "./widgets/Tabs";
import GroupCard from "./widgets/GroupCard";
import TotalTab from "./widgets/TotalTab";

export default function App() {
  const [active, setActive] = React.useState<TabKey>("IRP");

  const tabs = [
    { key: "IRP", label: "ИРП" },
    { key: "ICZ", label: "ИЦЗ" },
    { key: "IKD", label: "ИКД" },
    { key: "IPE", label: "ИПЭ" },
    { key: "IAP", label: "ИАП" },
    { key: "TOTAL", label: "Итог" },
  ];

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Калькулятор индекса качества ЦСМК
      </h1>
      <Tabs tabs={tabs} active={active} onChange={setActive} />

      {active != "TOTAL" ? (
        <GroupCard group={active as GroupKey} />
      ) : (
        <TotalTab />
      )}
    </main>
  );
}
