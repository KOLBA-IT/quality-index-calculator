import { Field, GroupKey, GROUPS } from "../../shared/store/useQualityStore";

export function normalizeByField(field: Field, x: number): number {
  switch (field.type) {
    case "percent":
      return x / 100;

    case "score":
      return (x - field.min) / (field.max - field.min);

    case "ratio":
      if (field.direction === "down") {
        return Math.min(1, field.N! / x);
      }
      return Math.min(1, x / field.N!);

    default:
      return 0;
  }
}

export function calcGroupIndex(
  group: GroupKey,
  groupInputs: Record<string, number | "">,
  groupWeights: Record<string, number>,
): number {
  const cfg = GROUPS[group];
  let result = 0;

  for (const f of cfg.fields) {
    const inputValue = groupInputs[f.key];
    if (inputValue === "") continue;
    result += normalizeByField(f, inputValue) * groupWeights[f.key];
    console.log(inputValue, normalizeByField(f, inputValue), result);
  }

  return result;
}

export function calcResultIndex(
  groupResults: Record<string, number | null>,
  groupWeights: Record<string, number | null>,
): number {
  let result = 0;
  let totalWeight = 0;

  for (const group in GROUPS) {
    const weight = groupWeights[group];
    totalWeight += weight!;
    if (totalWeight > 1) {
      return -1;
    }
    result += weight! * groupResults[group]!;
  }

  return result;
}
