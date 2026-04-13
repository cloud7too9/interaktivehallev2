import { strukturbereiche, arbeitsbereiche } from "../core";
import type { Strukturbereich, Arbeitsbereich, ArbeitsbereichId, ArbeitsbereichStatus, Auftrag } from "../core";

const SPALTEN = 20;
const ZEILEN = 36;
const ZELL_GROESSE = 28;
const GAP = 1;

const STRUKTUR_FARBEN: Record<string, string> = {
  hof: "#f5c842",
  halle1: "#e8c8f0",
  halle2: "#f0a0a0",
  lager: "#b8b0d0",
};

const FUNKTION_FARBEN: Record<string, string> = {
  packen: "#4a9eff",
  saegen: "#34c759",
  bearbeiten: "#ff9500",
};

const STATUS_OVERLAY: Record<ArbeitsbereichStatus, string> = {
  aktiv: "",
  inaktiv: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)",
  wartung: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,165,0,0.3) 4px, rgba(255,165,0,0.3) 8px)",
};

export function HallenRaster({
  aktiv,
  onSelect,
  getStatus,
  fuerBereich,
}: {
  aktiv: string | null;
  onSelect: (id: string | null) => void;
  getStatus: (id: ArbeitsbereichId) => ArbeitsbereichStatus;
  fuerBereich: (id: ArbeitsbereichId) => Auftrag[];
}) {
  const rasterBereiche = strukturbereiche.filter((b) => b.raster);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${SPALTEN}, ${ZELL_GROESSE}px)`,
        gridTemplateRows: `repeat(${ZEILEN}, ${ZELL_GROESSE}px)`,
        gap: `${GAP}px`,
        position: "relative",
      }}
    >
      {rasterBereiche.map((b) => (
        <StrukturZelle key={b.id} bereich={b} aktiv={aktiv} />
      ))}
      {arbeitsbereiche.map((a) => (
        <ArbeitsZelle
          key={a.id}
          bereich={a}
          aktiv={aktiv}
          onSelect={onSelect}
          status={getStatus(a.id)}
          auftraegeAnzahl={fuerBereich(a.id).length}
        />
      ))}
    </div>
  );
}

function StrukturZelle({
  bereich,
  aktiv,
}: {
  bereich: Strukturbereich;
  aktiv: string | null;
}) {
  const r = bereich.raster!;
  const farbe = STRUKTUR_FARBEN[bereich.id] ?? "#ddd";
  const istAktiv = aktiv === bereich.id;

  return (
    <div
      style={{
        gridColumn: `${r.spalte + 1} / span ${r.spalten}`,
        gridRow: `${r.zeile + 1} / span ${r.zeilen}`,
        backgroundColor: farbe,
        opacity: istAktiv ? 1 : 0.4,
        border: istAktiv ? "2px solid #333" : "1px solid #ccc",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "#444",
        transition: "opacity 0.15s, border 0.15s",
      }}
    >
      {bereich.name}
    </div>
  );
}

function ArbeitsZelle({
  bereich,
  aktiv,
  onSelect,
  status,
  auftraegeAnzahl,
}: {
  bereich: Arbeitsbereich;
  aktiv: string | null;
  onSelect: (id: string | null) => void;
  status: ArbeitsbereichStatus;
  auftraegeAnzahl: number;
}) {
  const r = bereich.raster;
  const farbe = FUNKTION_FARBEN[bereich.funktion] ?? "#888";
  const istAktiv = aktiv === bereich.id;
  const gedimmt = status === "inaktiv" ? 0.4 : 1;

  return (
    <div
      onClick={() => onSelect(istAktiv ? null : bereich.id)}
      onMouseEnter={(e) => e.currentTarget.style.outline = "2px solid #000"}
      onMouseLeave={(e) => e.currentTarget.style.outline = "none"}
      style={{
        gridColumn: `${r.spalte + 1} / span ${r.spalten}`,
        gridRow: `${r.zeile + 1} / span ${r.zeilen}`,
        backgroundColor: farbe,
        backgroundImage: STATUS_OVERLAY[status],
        opacity: istAktiv ? 1 : 0.75 * gedimmt,
        border: istAktiv ? "2px solid #000" : "1px solid rgba(0,0,0,0.2)",
        borderRadius: "6px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "0.7rem",
        fontWeight: 600,
        color: "#fff",
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        transition: "opacity 0.15s, border 0.15s, transform 0.15s",
        transform: istAktiv ? "scale(1.02)" : "scale(1)",
        zIndex: istAktiv ? 10 : 2,
      }}
    >
      <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
        {bereich.nummer}
      </span>
      <span>{bereich.name}</span>
      {auftraegeAnzahl > 0 && (
        <span
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            backgroundColor: "#fff",
            color: "#333",
            fontSize: "0.6rem",
            fontWeight: 700,
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          {auftraegeAnzahl}
        </span>
      )}
    </div>
  );
}
