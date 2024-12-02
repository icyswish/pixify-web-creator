import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AppointmentSection } from "./AppointmentSection";

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

  const handleDeleteAppointment = async (id: string) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

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
  );
};