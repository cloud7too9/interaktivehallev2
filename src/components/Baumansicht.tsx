import { strukturbereiche, arbeitsbereiche } from "../core";
import type { ArbeitsbereichId, ArbeitsbereichStatus } from "../core";

const STATUS_SYMBOL: Record<ArbeitsbereichStatus, string> = {
  aktiv: "\u25CF",
  inaktiv: "\u25CB",
  wartung: "\u25D2",
};

const STATUS_FARBE: Record<ArbeitsbereichStatus, string> = {
  aktiv: "#34c759",
  inaktiv: "#999",
  wartung: "#ff9500",
};

export function Baumansicht({
  aktiv,
  onSelect,
  getStatus,
}: {
  aktiv: string | null;
  onSelect: (id: string | null) => void;
  getStatus: (id: ArbeitsbereichId) => ArbeitsbereichStatus;
}) {
  const gelaende = strukturbereiche.find((b) => b.id === "gelaende")!;
  return (
    <div style={{ fontSize: "0.8rem", lineHeight: 1.8, userSelect: "none" }}>
      <BaumKnoten
        id={gelaende.id}
        name={gelaende.name}
        aktiv={aktiv}
        onSelect={onSelect}
        getStatus={getStatus}
        tiefe={0}
      />
    </div>
  );
}

function BaumKnoten({
  id,
  name,
  aktiv,
  onSelect,
  getStatus,
  tiefe,
}: {
  id: string;
  name: string;
  aktiv: string | null;
  onSelect: (id: string | null) => void;
  getStatus: (id: ArbeitsbereichId) => ArbeitsbereichStatus;
  tiefe: number;
}) {
  const struktur = strukturbereiche.find((b) => b.id === id);
  const arbeits = arbeitsbereiche.filter((a) => a.halleId === id);
  const istAktiv = aktiv === id;

  const kinder = struktur?.teilbereiche ?? [];
  const hatKinder = kinder.length > 0 || arbeits.length > 0;

  return (
    <div style={{ paddingLeft: tiefe > 0 ? "1rem" : 0 }}>
      <div
        onClick={() => onSelect(istAktiv ? null : id)}
        style={{
          cursor: "pointer",
          padding: "2px 6px",
          borderRadius: "4px",
          backgroundColor: istAktiv ? "#e8f0fe" : "transparent",
          fontWeight: istAktiv ? 700 : 400,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span style={{ color: "#aaa", width: "1em", textAlign: "center" }}>
          {hatKinder ? "\u25BE" : " "}
        </span>
        {name}
      </div>

      {kinder.map((kindId) => {
        const kind = strukturbereiche.find((b) => b.id === kindId);
        if (!kind) return null;
        return (
          <BaumKnoten
            key={kindId}
            id={kind.id}
            name={kind.name}
            aktiv={aktiv}
            onSelect={onSelect}
            getStatus={getStatus}
            tiefe={tiefe + 1}
          />
        );
      })}

      {arbeits.map((ab) => {
        const status = getStatus(ab.id);
        const istAbAktiv = aktiv === ab.id;
        return (
          <div
            key={ab.id}
            onClick={() => onSelect(istAbAktiv ? null : ab.id)}
            style={{
              cursor: "pointer",
              padding: "2px 6px",
              paddingLeft: `${(tiefe + 1) * 16 + 6}px`,
              borderRadius: "4px",
              backgroundColor: istAbAktiv ? "#e8f0fe" : "transparent",
              fontWeight: istAbAktiv ? 700 : 400,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: STATUS_FARBE[status], fontSize: "0.7rem" }}>
              {STATUS_SYMBOL[status]}
            </span>
            <span style={{ color: "#888", fontWeight: 700, minWidth: "1.2em" }}>
              {ab.nummer}
            </span>
            {ab.name}
          </div>
        );
      })}
    </div>
  );
}
