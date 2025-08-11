import { create } from "zustand";

export type GroupKey = "IRP" | "ICZ" | "IKD" | "IPE" | "IAP";

export type ValueType = "percent" | "time" | "count" | "scale" | "share";

export type Field = {
  key: string;
  label: string;
  unit?: string;
  placeholder?: string;
  type: ValueType;
  min?: number;
  max?: number;
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
      },
      {
        key: "fixed_in_time",
        label: "Доля устранённых отклонений в срок",
        unit: "%",
        type: "percent",
      },
      {
        key: "regulations_match",
        label: "Уровень соответствия регламентам",
        unit: "%",
        type: "percent",
      },
      {
        key: "reaction_time",
        label: "Время реакции на отклонение",
        unit: "ч",
        type: "time",
      },
      {
        key: "repeat_defects_delta",
        label: "Снижение повторяющихся дефектов (после цифровизации)",
        unit: "%",
        type: "percent",
      },
    ],
  },
  ICZ: { title: "Индекс цифровой зрелости (ИЦЗ)", fields: [] },
  IKD: { title: "Индекс качества данных (ИКД)", fields: [] },
  IPE: { title: "Индекс пользовательской эффективности (ИПЭ)", fields: [] },
  IAP: { title: "Индекс адаптивности процессов (ИАП)", fields: [] },
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
