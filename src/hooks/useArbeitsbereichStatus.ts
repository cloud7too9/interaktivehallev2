import { useState } from "react";
import type { ArbeitsbereichId, ArbeitsbereichStatus } from "../core";
import { arbeitsbereiche } from "../core";

type StatusMap = Record<ArbeitsbereichId, ArbeitsbereichStatus>;

function initialStatus(): StatusMap {
  const map = {} as StatusMap;
  for (const ab of arbeitsbereiche) {
    map[ab.id] = "aktiv";
  }
  return map;
}

export function useArbeitsbereichStatus() {
  const [statusMap, setStatusMap] = useState<StatusMap>(initialStatus);

  function setStatus(id: ArbeitsbereichId, status: ArbeitsbereichStatus) {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  }

  function getStatus(id: ArbeitsbereichId): ArbeitsbereichStatus {
    return statusMap[id];
  }

  return { statusMap, getStatus, setStatus };
}
