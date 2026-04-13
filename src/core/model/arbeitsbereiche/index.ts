import type { Arbeitsbereich } from "../../typen";
import { packstation } from "./packstation";
import { saege1 } from "./saege1";
import { saege2 } from "./saege2";
import { saege3 } from "./saege3";
import { bearbeitungsbereich1 } from "./bearbeitungsbereich1";
import { bearbeitungsbereich2 } from "./bearbeitungsbereich2";
import { bearbeitungsbereich3 } from "./bearbeitungsbereich3";
import { bearbeitungsbereich4 } from "./bearbeitungsbereich4";

export {
  packstation,
  saege1,
  saege2,
  saege3,
  bearbeitungsbereich1,
  bearbeitungsbereich2,
  bearbeitungsbereich3,
  bearbeitungsbereich4,
};

export const arbeitsbereiche: Arbeitsbereich[] = [
  packstation,
  saege2,
  bearbeitungsbereich1,
  saege3,
  bearbeitungsbereich2,
  saege1,
  bearbeitungsbereich3,
  bearbeitungsbereich4,
];
