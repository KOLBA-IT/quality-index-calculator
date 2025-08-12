import { Field } from "../../shared/store/useQualityStore";

export function normalizeByField(field: Field, x: number): number {
  switch (field.type) {
    case "percent":
      return x / 100;

    case "score":
      return (x - field.min) / (field.max - field.max);

    case "ratio":
      if (field.direction === "down") {
        return Math.min(1, field.N! / x);
      }
      return Math.max(0, x / field.N!);

    default:
      return 0;
  }
}
