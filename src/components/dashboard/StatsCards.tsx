import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

export const StatsCards = () => {
  const { state } = useApp();
  const [showDoctorsDialog, setShowDoctorsDialog] = useState(false);
  const [showAppointmentsDialog, setShowAppointmentsDialog] = useState(false);

  const onDutyDoctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrician" },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Neurologist" },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Link to="/patients" className="block">
        <Card className="glass-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Records of Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{state.totalPatients}</p>
            <p className="text-sm text-gray-500">Total patients</p>
          </CardContent>
        </Card>
      </Link>

      <Card 
        className="glass-card hover:shadow-lg transition-shadow cursor-pointer" 
        onClick={() => setShowDoctorsDialog(true)}
      >
        <CardHeader>
          <CardTitle>Scheduled Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{state.onDutyDoctors}</p>
          <p className="text-sm text-gray-500">Doctors on duty today</p>
        </CardContent>
      </Card>

      <Card 
        className="glass-card hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowAppointmentsDialog(true)}
      >
        <CardHeader>
          <CardTitle>Appointment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{state.todayAppointments}</p>
          <p className="text-sm text-gray-500">Appointments today</p>
        </CardContent>
      </Card>

      <Dialog open={showDoctorsDialog} onOpenChange={setShowDoctorsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Doctors on Duty Today</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {onDutyDoctors.map((doctor) => (
              <div key={doctor.id} className="p-4 border rounded-lg">
                <p className="font-medium">{doctor.name}</p>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAppointmentsDialog} onOpenChange={setShowAppointmentsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Today's Appointments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* We'll reuse the AppointmentsList component here */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};