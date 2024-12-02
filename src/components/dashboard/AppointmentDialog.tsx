import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format, subHours } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Appointment {
  id: string;
  patient_name: string;
  datetime: string;
  type: string;
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

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    // Subtract 8 hours for Philippines timezone
    const adjustedDate = subHours(date, 8);
    return format(adjustedDate, 'h:mm a');
  };

  const isAppointmentFinished = (datetime: string) => {
    return new Date(datetime) < new Date();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Today's Appointments Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Finished Appointments</h3>
            {appointments
              .filter(app => isAppointmentFinished(app.datetime))
              .map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{appointment.patient_name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(appointment.datetime)}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Upcoming Appointments</h3>
            {appointments
              .filter(app => !isAppointmentFinished(app.datetime))
              .map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{appointment.patient_name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(appointment.datetime)}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};