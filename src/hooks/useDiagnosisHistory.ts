/*
 * useDiagnosisHistory — localStorage persistence for completed wizard diagnoses
 * "Before You Call" — Save your diagnostic path to reference when calling a pro
 */
import { useState, useCallback, useEffect } from "react";

export interface DiagnosisStep {
  nodeId: string;
  title: string;
  icon: string;
  type: string;
  selectedOption?: string;
}

export interface SavedDiagnosis {
  id: string;
  wizardType: "electrical" | "automotive" | "lawn-garden" | "motorcycle";
  wizardLabel: string;
  timestamp: number;
  steps: DiagnosisStep[];
  outcome: {
    type: "resolved" | "call-tech" | "stop";
    title: string;
    message: string;
    script?: string;
    tip?: string;
  };
}

const STORAGE_KEY = "byc-diagnosis-history";
const MAX_SAVED = 50;

function loadHistory(): SavedDiagnosis[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedDiagnosis[];
  } catch {
    return [];
  }
}

function saveHistory(history: SavedDiagnosis[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_SAVED)));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function useDiagnosisHistory() {
  const [history, setHistory] = useState<SavedDiagnosis[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addDiagnosis = useCallback((diagnosis: SavedDiagnosis) => {
    setHistory((prev) => {
      const updated = [diagnosis, ...prev].slice(0, MAX_SAVED);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const removeDiagnosis = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addDiagnosis, removeDiagnosis, clearAll };
}

/** Generate a short unique ID */
export function generateDiagnosisId(): string {
  return `dx-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
