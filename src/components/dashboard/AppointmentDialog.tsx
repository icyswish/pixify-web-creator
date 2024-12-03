import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AppointmentSection } from "./AppointmentSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Appointment {
  id: string;
  patient_name: string;
  datetime: string;
  type: string;
  is_completed?: boolean;
}

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointments: Appointment[];
  onAppointmentDeleted: () => void;
}

export const AppointmentDialog = ({ 
  open, 
  onOpenChange, 
  appointments,
  onAppointmentDeleted 
}: AppointmentDialogProps) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);

  const handleDeleteAppointment = async (id: string) => {
    setAppointmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!appointmentToDelete) return;

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', appointmentToDelete);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete appointment",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Appointment deleted successfully",
    });
    setDeleteDialogOpen(false);
    onAppointmentDeleted();
  };

  const handleComplete = async (id: string) => {
    const { error } = await supabase
      .from('appointments')
      .update({ is_completed: true })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark appointment as complete",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Appointment marked as complete",
    });
    onAppointmentDeleted();
  };

  const isAppointmentFinished = (datetime: string) => {
    return new Date(datetime) < new Date();
  };

  const finishedAppointments = appointments.filter(app => isAppointmentFinished(app.datetime));
  const upcomingAppointments = appointments.filter(app => !isAppointmentFinished(app.datetime));

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Today's Appointments Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <AppointmentSection
              title="Finished Appointments"
              appointments={finishedAppointments}
              onDelete={handleDeleteAppointment}
              onComplete={handleComplete}
            />
            <AppointmentSection
              title="Upcoming Appointments"
              appointments={upcomingAppointments}
              onDelete={handleDeleteAppointment}
              onComplete={handleComplete}
            />
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the appointment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};