import type { Arbeitsbereich } from "../../typen";

export const packstation: Arbeitsbereich = {
  id: "packstation",
  name: "Packstation",
  nummer: 1,
  funktion: "packen",
  parentId: "hauptbereich",
  halleId: "halle2",
  raster: { spalte: 13, zeile: 31, spalten: 7, zeilen: 5 },
};
