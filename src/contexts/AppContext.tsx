import React, { createContext, useContext, useState } from "react";

interface AppState {
  totalPatients: number;
  totalDoctors: number;
  todayAppointments: number;
  onDutyDoctors: number;
  onDutyNurses: number;
}

interface AppContextType {
  state: AppState;
  addPatient: () => void;
  addDoctor: () => void;
  addAppointment: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    totalPatients: 128,
    totalDoctors: 15,
    todayAppointments: 24,
    onDutyDoctors: 8,
    onDutyNurses: 12,
  });

  const addPatient = () => {
    setState(prev => ({
      ...prev,
      totalPatients: prev.totalPatients + 1
    }));
  };

  const addDoctor = () => {
    setState(prev => ({
      ...prev,
      totalDoctors: prev.totalDoctors + 1,
      onDutyDoctors: prev.onDutyDoctors + 1
    }));
  };

  const addAppointment = () => {
    setState(prev => ({
      ...prev,
      todayAppointments: prev.todayAppointments + 1
    }));
  };

  return (
    <AppContext.Provider value={{ state, addPatient, addDoctor, addAppointment }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}