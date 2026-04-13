import { useState } from "react";
import { HallenRaster } from "./components/HallenRaster";
import { Baumansicht } from "./components/Baumansicht";
import { StatusLeiste } from "./components/StatusLeiste";
import { useArbeitsbereichStatus } from "./hooks/useArbeitsbereichStatus";

export function App() {
  const [aktiv, setAktiv] = useState<string | null>(null);
  const { getStatus, setStatus } = useArbeitsbereichStatus();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          borderRight: "1px solid #e0e0e0",
          padding: "1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.1rem", margin: 0 }}>Interaktive Halle</h1>

        <div>
          <h2 style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
            Struktur
          </h2>
          <Baumansicht
            aktiv={aktiv}
            onSelect={setAktiv}
            getStatus={getStatus}
          />
        </div>

        <div>
          <h2 style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
            Status
          </h2>
          <StatusLeiste
            aktiv={aktiv}
            getStatus={getStatus}
            setStatus={setStatus}
          />
        </div>

        <Legende />
      </aside>

      {/* Hauptbereich */}
      <main
        style={{
          flex: 1,
          padding: "1.5rem",
          overflowY: "auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <HallenRaster
          aktiv={aktiv}
          onSelect={setAktiv}
          getStatus={getStatus}
        />
      </main>
    </div>
  );
}

function Legende() {
  const eintraege = [
    { farbe: "#4a9eff", label: "Packen" },
    { farbe: "#34c759", label: "Sägen" },
    { farbe: "#ff9500", label: "Bearbeiten" },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
        Legende
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {eintraege.map((e) => (
          <div
            key={e.label}
            style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem" }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                backgroundColor: e.farbe,
              }}
            />
            {e.label}
          </div>
        ))}
      </div>
    </div>
  );
}
