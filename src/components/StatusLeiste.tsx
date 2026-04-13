import { arbeitsbereiche } from "../core";
import type { ArbeitsbereichId, ArbeitsbereichStatus } from "../core";

const STATUS_OPTIONEN: ArbeitsbereichStatus[] = ["aktiv", "inaktiv", "wartung"];

const STATUS_LABEL: Record<ArbeitsbereichStatus, string> = {
  aktiv: "Aktiv",
  inaktiv: "Inaktiv",
  wartung: "Wartung",
};

const STATUS_FARBE: Record<ArbeitsbereichStatus, string> = {
  aktiv: "#34c759",
  inaktiv: "#999",
  wartung: "#ff9500",
};

export function StatusLeiste({
  aktiv,
  getStatus,
  setStatus,
}: {
  aktiv: string | null;
  getStatus: (id: ArbeitsbereichId) => ArbeitsbereichStatus;
  setStatus: (id: ArbeitsbereichId, status: ArbeitsbereichStatus) => void;
}) {
  const ab = arbeitsbereiche.find((a) => a.id === aktiv);

  if (!ab) {
    return (
      <div style={{ fontSize: "0.8rem", color: "#888" }}>
        Bereich auswählen, um Status zu ändern.
      </div>
    );
  }

  const currentStatus = getStatus(ab.id);

  return (
    <div style={{ fontSize: "0.85rem" }}>
      <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
        {ab.name} — Status
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {STATUS_OPTIONEN.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(ab.id, s)}
            style={{
              padding: "4px 12px",
              border: currentStatus === s ? `2px solid ${STATUS_FARBE[s]}` : "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: currentStatus === s ? `${STATUS_FARBE[s]}20` : "#fff",
              color: currentStatus === s ? STATUS_FARBE[s] : "#666",
              fontWeight: currentStatus === s ? 700 : 400,
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {STATUS_LABEL[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
