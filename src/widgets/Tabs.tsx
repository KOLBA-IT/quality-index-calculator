export type TabKey = string;

type Tab = {
  key: TabKey;
  label: string;
};

type Props = {
  tabs: Tab[];
  active: TabKey;
  onChange: (key: TabKey) => void;
};

export default function Tabs({ tabs, active, onChange }: Props) {
  return (
    <div className="mb-4 border-b">
      <nav className="flex gap-2"></nav>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-3 py-2 -mb-px border-b-2 ${
              isActive
                ? "border-black font-semibold"
                : "border-transparent text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
