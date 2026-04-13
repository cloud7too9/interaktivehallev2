import type { Strukturbereich } from "../../typen";
import { hof } from "./hof";
import { halle1 } from "./halle1";
import { halle2 } from "./halle2";
import { lager } from "./lager";
import { hauptbereich } from "./hauptbereich";
import { gebaeude } from "./gebaeude";
import { gelaende } from "./gelaende";

export { hof, halle1, halle2, lager, hauptbereich, gebaeude, gelaende };

export const strukturbereiche: Strukturbereich[] = [
  hof,
  halle1,
  halle2,
  lager,
  hauptbereich,
  gebaeude,
  gelaende,
];
