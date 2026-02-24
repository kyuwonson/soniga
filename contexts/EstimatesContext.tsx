"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface SavedEstimate {
  id: string;
  category: string;
  estimateType: string;
  vendorName: string;
  totalPrice: string;
  note: string;
  savedAt: string;
}

interface EstimatesContextType {
  savedEstimates: SavedEstimate[];
  saveEstimate: (estimate: Omit<SavedEstimate, "id" | "savedAt">) => void;
  removeEstimate: (id: string) => void;
}

const EstimatesContext = createContext<EstimatesContextType | undefined>(
  undefined
);

const STORAGE_KEY = "savedEstimates";

export function EstimatesProvider({ children }: { children: ReactNode }) {
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedEstimates(JSON.parse(stored));
      } catch {
        setSavedEstimates([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedEstimates));
  }, [savedEstimates]);

  const saveEstimate = (
    estimate: Omit<SavedEstimate, "id" | "savedAt">
  ) => {
    const newEstimate: SavedEstimate = {
      ...estimate,
      id: `est_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      savedAt: new Date().toISOString(),
    };
    setSavedEstimates((prev) => [...prev, newEstimate]);
  };

  const removeEstimate = (id: string) => {
    setSavedEstimates((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EstimatesContext.Provider
      value={{ savedEstimates, saveEstimate, removeEstimate }}
    >
      {children}
    </EstimatesContext.Provider>
  );
}

export function useEstimates() {
  const context = useContext(EstimatesContext);
  if (context === undefined) {
    throw new Error("useEstimates must be used within an EstimatesProvider");
  }
  return context;
}
