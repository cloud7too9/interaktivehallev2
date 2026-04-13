import type { BereichId } from "./bereich-id";
import type { RasterPosition } from "./raster-position";

export type Strukturbereich = {
  id: BereichId;
  name: string;
  raster?: RasterPosition;
  teilbereiche?: string[];
};
