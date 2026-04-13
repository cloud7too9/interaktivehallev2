import { HallenRaster } from "./components/HallenRaster";

export function App() {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
        Interaktive Halle
      </h1>
      <HallenRaster />
    </div>
  );
}
