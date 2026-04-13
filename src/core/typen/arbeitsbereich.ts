import type { ArbeitsbereichId } from "./arbeitsbereich-id";
import type { ArbeitsbereichFunktion } from "./arbeitsbereich-funktion";
import type { HallenId } from "./hallen-id";
import type { RasterPosition } from "./raster-position";

export type Arbeitsbereich = {
  id: ArbeitsbereichId;
  name: string;
  nummer: number;
  funktion: ArbeitsbereichFunktion;
  parentId: "hauptbereich";
  halleId: HallenId;
  raster: RasterPosition;
};
