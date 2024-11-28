import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    totalPatients: 0,
    totalDoctors: 0,
    todayAppointments: 0,
    onDutyDoctors: 0,
    onDutyNurses: 12,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const { data: patients } = await supabase
      .from('patients')
      .select('id');
    
    const { data: doctors } = await supabase
      .from('doctors')
      .select('id');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: appointments } = await supabase
      .from('appointments')
      .select('id')
      .gte('datetime', today.toISOString())
      .lt('datetime', new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString());

    setState(prev => ({
      ...prev,
      totalPatients: patients?.length || 0,
      totalDoctors: doctors?.length || 0,
      todayAppointments: appointments?.length || 0,
      onDutyDoctors: doctors?.length || 0,
    }));
  };

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