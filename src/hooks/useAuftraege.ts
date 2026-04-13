import { useState } from "react";
import type { Auftrag, AuftragStatus, ArbeitsbereichId } from "../core";

let nextId = 1;

export function useAuftraege() {
  const [auftraege, setAuftraege] = useState<Auftrag[]>([]);

  function erstellen(name: string): Auftrag {
    const auftrag: Auftrag = {
      id: `A-${String(nextId++).padStart(3, "0")}`,
      name,
      status: "offen",
      bereichId: null,
    };
    setAuftraege((prev) => [...prev, auftrag]);
    return auftrag;
  }

  function zuweisen(auftragId: string, bereichId: ArbeitsbereichId | null) {
    setAuftraege((prev) =>
      prev.map((a) =>
        a.id === auftragId
          ? { ...a, bereichId, status: bereichId ? "in_bearbeitung" : "offen" }
          : a
      )
    );
  }

  function statusAendern(auftragId: string, status: AuftragStatus) {
    setAuftraege((prev) =>
      prev.map((a) => (a.id === auftragId ? { ...a, status } : a))
    );
  }

  function entfernen(auftragId: string) {
    setAuftraege((prev) => prev.filter((a) => a.id !== auftragId));
  }

  function fuerBereich(bereichId: ArbeitsbereichId): Auftrag[] {
    return auftraege.filter((a) => a.bereichId === bereichId);
  }

  return { auftraege, erstellen, zuweisen, statusAendern, entfernen, fuerBereich };
}
