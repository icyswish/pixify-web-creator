import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const StatsCards = () => {
  const { state } = useApp();
  const [showDoctorsDialog, setShowDoctorsDialog] = useState(false);
  const [showAppointmentsDialog, setShowAppointmentsDialog] = useState(false);
  const [showPatientsDialog, setShowPatientsDialog] = useState(false);
  const { toast } = useToast();

  const patients = [
    { id: 1, name: "John Smith", age: 45, lastVisit: "2024-02-15", condition: "Hypertension" },
    { id: 2, name: "Maria Garcia", age: 32, lastVisit: "2024-02-14", condition: "Diabetes Type 2" },
    { id: 3, name: "David Wilson", age: 28, lastVisit: "2024-02-10", condition: "Asthma" }
  ];

  const onDutyDoctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrician" },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Neurologist" },
  ];

  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      datetime: "2024-03-20T09:00",
      doctor: "Dr. Sarah Johnson",
      type: "Check-up"
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      datetime: "2024-03-20T10:30",
      doctor: "Dr. Michael Chen",
      type: "Follow-up"
    },
    {
      id: 3,
      patientName: "David Wilson",
      datetime: "2024-03-21T14:00",
      doctor: "Dr. Emily Rodriguez",
      type: "Consultation"
    }
  ];

  const handleDelete = (type: string, id: number) => {
    toast({
      title: `${type} deleted`,
      description: `The ${type.toLowerCase()} has been successfully deleted.`,
    });
  };

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Card 
        className="glass-card hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowPatientsDialog(true)}
      >
        <CardHeader>
          <CardTitle>Records of Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{state.totalPatients}</p>
          <p className="text-sm text-gray-500">Total patients</p>
        </CardContent>
      </Card>

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

      <Dialog open={showPatientsDialog} onOpenChange={setShowPatientsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Records</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-500">Age: {patient.age}</p>
                  <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
                  <p className="text-sm text-gray-500">{patient.condition}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete('Patient', patient.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDoctorsDialog} onOpenChange={setShowDoctorsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Doctors on Duty Today</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {onDutyDoctors.map((doctor) => (
              <div key={doctor.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete('Doctor', doctor.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                    <p className="text-sm text-gray-500">{appointment.doctor}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.datetime).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete('Appointment', appointment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};