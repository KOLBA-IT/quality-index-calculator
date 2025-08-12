import { create } from "zustand";

export type GroupKey = "IRP" | "ICZ" | "IKD" | "IPE" | "IAP";

export type ValueType = "percent" | "score" | "ratio";

export type Field = {
  key: string;
  label: string;
  placeholder: string;
  type: ValueType;
  min: number;
  max: number;
  unit?: string;
  N?: number;
  direction?: "up" | "down";
};

export type GroupConfig = {
  title: string;
  fields: Field[];
};

export const GROUPS: Record<GroupKey, GroupConfig> = {
  IRP: {
    title: "Индекс результативности процессов (ИРП)",
    fields: [
      {
        key: "auto_nonconform",
        label: "Доля несоответствий, зафиксированных автоматически",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "fixed_in_time",
        label: "Доля устранённых отклонений в срок",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "regulations_match",
        label: "Уровень соответствия регламентам",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "reaction_time",
        label: "Время реакции на отклонение",
        unit: "ч",
        type: "ratio",
        N: 168,
        direction: "down",
        min: 1,
        max: 336,
        placeholder: "1–336",
      },
      {
        key: "repeat_defects_delta",
        label: "Снижение повторяющихся дефектов (после цифровизации)",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
    ],
  },

  ICZ: {
    title: "Индекс цифровой зрелости (ИЦЗ)",
    fields: [
      {
        key: "automation_level",
        label: "Уровень автоматизации процессов СМК",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "integrations_count",
        label: "Количество интеграций с ИС",
        unit: "шт",
        type: "ratio",
        N: 100,
        direction: "up",
        min: 0,
        max: 200,
        placeholder: "0–200",
      },
      {
        key: "digital_twins_coverage",
        label: "Покрытие процессов цифровыми двойниками",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "bi_ml_usage",
        label: "Использование BI/ML",
        unit: "баллы",
        type: "score",
        min: 0,
        max: 5,
        placeholder: "0–5",
      },
      {
        key: "ontology_exists",
        label: "Наличие цифровой онтологии",
        type: "score",
        min: 0,
        max: 1,
        placeholder: "0/1",
      },
    ],
  },

  IKD: {
    title: "Индекс качества данных (ИКД)",
    fields: [
      {
        key: "data_completeness",
        label: "Полнота данных по качеству",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "data_verification",
        label: "Уровень верификации данных",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "doc_search_time",
        label: "Среднее время поиска документа",
        unit: "сек",
        type: "ratio",
        N: 600,
        direction: "down",
        min: 1,
        max: 1200,
        placeholder: "1–1200",
      },
      {
        key: "traceability_index",
        label: "Индекс прослеживаемости",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
    ],
  },

  IPE: {
    title: "Индекс пользовательской эффективности (ИПЭ)",
    fields: [
      {
        key: "digital_engagement",
        label: "Уровень цифровой вовлечённости",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "avg_time_in_system",
        label: "Среднее время работы с системой",
        unit: "мин/день",
        type: "ratio",
        N: 600,
        direction: "up",
        min: 0,
        max: 720,
        placeholder: "0–720",
      },
      {
        key: "user_satisfaction_sus",
        label: "Удовлетворённость пользователей (SUS)",
        unit: "баллы",
        type: "score",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "ui_error_rate",
        label: "Количество ошибок интерфейса",
        unit: "% за месяц",
        type: "ratio",
        N: 10,
        direction: "down",
        min: 0,
        max: 50,
        placeholder: "0–50",
      },
    ],
  },

  IAP: {
    title: "Индекс адаптивности процессов (ИАП)",
    fields: [
      {
        key: "updates_per_year",
        label: "Количество обновлений/улучшений ЦСМК",
        unit: "раз/год",
        type: "ratio",
        N: 12,
        direction: "up",
        min: 0,
        max: 52,
        placeholder: "0–52",
      },
      {
        key: "data_driven_changes",
        label: "Доля процессов, изменённых на основе данных",
        unit: "%",
        type: "percent",
        min: 0,
        max: 100,
        placeholder: "0–100",
      },
      {
        key: "avg_change_impl_days",
        label: "Среднее время внедрения изменений",
        unit: "дни",
        type: "ratio",
        N: 180,
        direction: "down",
        min: 1,
        max: 365,
        placeholder: "1–365",
      },
      {
        key: "self_learning_modules",
        label: "Наличие самообучающихся модулей",
        unit: "баллы",
        type: "score",
        min: 0,
        max: 5,
        placeholder: "0–5",
      },
    ],
  },
};

type InputState = Record<GroupKey, Record<string, number | "">>;

type Store = {
  inputs: InputState;
  groupWeights: Record<GroupKey, number>;
  setInput: (group: GroupKey, key: string, value: number | "") => void;
  setGroupWeight: (group: GroupKey, value: number) => void;
  reset: () => void;
};

const emptyGroup = (g: GroupKey) =>
  Object.fromEntries(GROUPS[g].fields.map((f) => [f.key, ""])) as Record<
    string,
    ""
  >;

export const useQualityStore = create<Store>((set) => ({
  inputs: {
    IRP: emptyGroup("IRP"),
    ICZ: {},
    IKD: {},
    IPE: {},
    IAP: {},
  },
  groupWeights: { IRP: 0.2, ICZ: 0.2, IKD: 0.2, IPE: 0.2, IAP: 0.2 },
  setInput: (group, key, value) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [group]: {
          ...state.inputs[group],
          [key]: value,
        },
      },
    })),
  setGroupWeight: (group, value) =>
    set((state) => ({
      groupWeights: { ...state.groupWeights, [group]: value },
    })),
  reset: () =>
    set(() => ({
      inputs: {
        IRP: emptyGroup("IRP"),
        ICZ: {},
        IKD: {},
        IPE: {},
        IAP: {},
      },
    })),
}));
