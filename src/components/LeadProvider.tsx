"use client";

import { createContext, useContext, useState } from "react";

export type Assessment = {
  boilerAge: string;
  lastService: string;
  symptoms: string[];
  score: number;
  level: "Low" | "Medium" | "High";
};

type Ctx = {
  assessment: Assessment | null;
  setAssessment: (a: Assessment | null) => void;
};

const LeadCtx = createContext<Ctx>({ assessment: null, setAssessment: () => {} });

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  return (
    <LeadCtx.Provider value={{ assessment, setAssessment }}>
      {children}
    </LeadCtx.Provider>
  );
}

export const useLead = () => useContext(LeadCtx);
