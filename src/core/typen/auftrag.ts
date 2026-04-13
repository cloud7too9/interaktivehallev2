import type { ArbeitsbereichId } from "./arbeitsbereich-id";

export type AuftragStatus = "offen" | "in_bearbeitung" | "abgeschlossen";

export type Auftrag = {
  id: string;
  name: string;
  status: AuftragStatus;
  bereichId: ArbeitsbereichId | null;
};
