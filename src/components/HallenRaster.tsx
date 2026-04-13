import { useState } from "react";
import { strukturbereiche, arbeitsbereiche } from "../core";
import type { Strukturbereich, Arbeitsbereich } from "../core";

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

export function HallenRaster() {
  const [aktiv, setAktiv] = useState<string | null>(null);

  const rasterBereiche = strukturbereiche.filter((b) => b.raster);

  return (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
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
            onHover={setAktiv}
          />
        ))}
      </div>

      <InfoPanel aktiv={aktiv} />
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
  onHover,
}: {
  bereich: Arbeitsbereich;
  aktiv: string | null;
  onHover: (id: string | null) => void;
}) {
  const r = bereich.raster;
  const farbe = FUNKTION_FARBEN[bereich.funktion] ?? "#888";
  const istAktiv = aktiv === bereich.id;

  return (
    <div
      onMouseEnter={() => onHover(bereich.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        gridColumn: `${r.spalte + 1} / span ${r.spalten}`,
        gridRow: `${r.zeile + 1} / span ${r.zeilen}`,
        backgroundColor: farbe,
        opacity: istAktiv ? 1 : 0.75,
        border: istAktiv ? "2px solid #000" : "1px solid rgba(0,0,0,0.2)",
        borderRadius: "6px",
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
    </div>
  );
}

function InfoPanel({ aktiv }: { aktiv: string | null }) {
  const arbeitsbereich = arbeitsbereiche.find((a) => a.id === aktiv);

  if (!arbeitsbereich) {
    return (
      <div style={{ minWidth: "200px", color: "#888", fontSize: "0.85rem" }}>
        Bereich hovern, um Details zu sehen.
      </div>
    );
  }

  return (
    <div
      style={{
        minWidth: "200px",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "0.85rem",
        lineHeight: 1.6,
      }}
    >
      <strong style={{ fontSize: "1rem" }}>{arbeitsbereich.name}</strong>
      <div>Nr: {arbeitsbereich.nummer}</div>
      <div>Funktion: {arbeitsbereich.funktion}</div>
      <div>Halle: {arbeitsbereich.halleId}</div>
      <div>
        Raster: {arbeitsbereich.raster.spalte},{arbeitsbereich.raster.zeile} (
        {arbeitsbereich.raster.spalten}&times;{arbeitsbereich.raster.zeilen})
      </div>
    </div>
  );
}
