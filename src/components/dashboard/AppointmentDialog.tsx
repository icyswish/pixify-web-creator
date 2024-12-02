import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle } from "lucide-react";
import { format, addHours } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    // Add 8 hours for Philippines timezone
    const adjustedDate = addHours(date, 8);
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
                    {appointment.is_completed && (
                      <span className="text-sm text-green-500">Completed</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!appointment.is_completed && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleComplete(appointment.id)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
                    {appointment.is_completed && (
                      <span className="text-sm text-green-500">Completed</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!appointment.is_completed && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleComplete(appointment.id)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};