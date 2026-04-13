import { useState } from "react";
import { arbeitsbereiche } from "../core";
import type { Auftrag, AuftragStatus, ArbeitsbereichId } from "../core";

const STATUS_FARBE: Record<AuftragStatus, string> = {
  offen: "#999",
  in_bearbeitung: "#4a9eff",
  abgeschlossen: "#34c759",
};

const STATUS_LABEL: Record<AuftragStatus, string> = {
  offen: "Offen",
  in_bearbeitung: "In Bearbeitung",
  abgeschlossen: "Abgeschlossen",
};

export function Auftraege({
  auftraege,
  aktiv,
  onErstellen,
  onZuweisen,
  onStatusAendern,
  onEntfernen,
}: {
  auftraege: Auftrag[];
  aktiv: string | null;
  onErstellen: (name: string) => void;
  onZuweisen: (auftragId: string, bereichId: ArbeitsbereichId | null) => void;
  onStatusAendern: (auftragId: string, status: AuftragStatus) => void;
  onEntfernen: (auftragId: string) => void;
}) {
  const [neuerName, setNeuerName] = useState("");

  const aktiverBereich = arbeitsbereiche.find((a) => a.id === aktiv);
  const gefilterteAuftraege = aktiv
    ? auftraege.filter((a) => a.bereichId === aktiv)
    : auftraege;

  return (
    <div style={{ fontSize: "0.8rem" }}>
      {/* Neuen Auftrag erstellen */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (neuerName.trim()) {
            onErstellen(neuerName.trim());
            setNeuerName("");
          }
        }}
        style={{ display: "flex", gap: "4px", marginBottom: "0.75rem" }}
      >
        <input
          value={neuerName}
          onChange={(e) => setNeuerName(e.target.value)}
          placeholder="Neuer Auftrag..."
          style={{
            flex: 1,
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "0.8rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "4px 10px",
            border: "1px solid #4a9eff",
            borderRadius: "4px",
            backgroundColor: "#4a9eff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          +
        </button>
      </form>

      {/* Filter-Info */}
      {aktiverBereich && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "#888",
            marginBottom: "0.5rem",
          }}
        >
          Filter: {aktiverBereich.name}
        </div>
      )}

      {/* Auftragsliste */}
      {gefilterteAuftraege.length === 0 ? (
        <div style={{ color: "#aaa" }}>Keine Aufträge.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {gefilterteAuftraege.map((auftrag) => (
            <AuftragKarte
              key={auftrag.id}
              auftrag={auftrag}
              aktiv={aktiv}
              onZuweisen={onZuweisen}
              onStatusAendern={onStatusAendern}
              onEntfernen={onEntfernen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AuftragKarte({
  auftrag,
  aktiv,
  onZuweisen,
  onStatusAendern,
  onEntfernen,
}: {
  auftrag: Auftrag;
  aktiv: string | null;
  onZuweisen: (auftragId: string, bereichId: ArbeitsbereichId | null) => void;
  onStatusAendern: (auftragId: string, status: AuftragStatus) => void;
  onEntfernen: (auftragId: string) => void;
}) {
  const bereich = auftrag.bereichId
    ? arbeitsbereiche.find((a) => a.id === auftrag.bereichId)
    : null;

  return (
    <div
      style={{
        padding: "6px 8px",
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        borderLeft: `3px solid ${STATUS_FARBE[auftrag.status]}`,
        backgroundColor: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "4px",
        }}
      >
        <span style={{ fontWeight: 600 }}>
          <span style={{ color: "#aaa" }}>{auftrag.id}</span> {auftrag.name}
        </span>
        <button
          onClick={() => onEntfernen(auftrag.id)}
          style={{
            border: "none",
            background: "none",
            color: "#ccc",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0 2px",
          }}
          title="Entfernen"
        >
          ×
        </button>
      </div>

      <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
        {/* Status */}
        <select
          value={auftrag.status}
          onChange={(e) =>
            onStatusAendern(auftrag.id, e.target.value as AuftragStatus)
          }
          style={{
            fontSize: "0.7rem",
            padding: "2px 4px",
            border: "1px solid #ddd",
            borderRadius: "3px",
          }}
        >
          <option value="offen">{STATUS_LABEL.offen}</option>
          <option value="in_bearbeitung">{STATUS_LABEL.in_bearbeitung}</option>
          <option value="abgeschlossen">{STATUS_LABEL.abgeschlossen}</option>
        </select>

        {/* Bereich zuweisen */}
        <select
          value={auftrag.bereichId ?? ""}
          onChange={(e) =>
            onZuweisen(
              auftrag.id,
              (e.target.value as ArbeitsbereichId) || null
            )
          }
          style={{
            fontSize: "0.7rem",
            padding: "2px 4px",
            border: "1px solid #ddd",
            borderRadius: "3px",
          }}
        >
          <option value="">— kein Bereich —</option>
          {arbeitsbereiche.map((ab) => (
            <option key={ab.id} value={ab.id}>
              {ab.nummer} {ab.name}
            </option>
          ))}
        </select>

        {/* Schnellzuweisung zum aktiven Bereich */}
        {aktiv &&
          auftrag.bereichId !== aktiv &&
          arbeitsbereiche.some((a) => a.id === aktiv) && (
            <button
              onClick={() => onZuweisen(auftrag.id, aktiv as ArbeitsbereichId)}
              style={{
                fontSize: "0.65rem",
                padding: "2px 6px",
                border: "1px solid #4a9eff",
                borderRadius: "3px",
                backgroundColor: "#e8f0fe",
                color: "#4a9eff",
                cursor: "pointer",
              }}
              title={`Zuweisen an ${arbeitsbereiche.find((a) => a.id === aktiv)?.name}`}
            >
              → hierher
            </button>
          )}
      </div>

      {bereich && (
        <div style={{ fontSize: "0.7rem", color: "#888", marginTop: "3px" }}>
          → {bereich.name}
        </div>
      )}
    </div>
  );
}
