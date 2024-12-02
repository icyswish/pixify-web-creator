import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
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

const AppointmentsList = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
    
    const channel = supabase
      .channel('appointments_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, () => {
        fetchAppointments();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchAppointments = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .gte('datetime', today.toISOString())
      .lt('datetime', tomorrow.toISOString())
      .order('datetime', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive"
      });
      return;
    }

    setAppointments(data || []);
  };

  const handleDelete = async (id: string) => {
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
    fetchAppointments();
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
    fetchAppointments();
  };

  const formatDateTime = (datetime: string) => {
    // Convert UTC to local time and add 8 hours for Philippines timezone
    const date = new Date(datetime);
    const adjustedDate = addHours(date, 8);
    
    const formattedDate = format(adjustedDate, 'EEEE, MMM d');
    const formattedTime = format(adjustedDate, 'h:mm a');
    
    return {
      date: formattedDate,
      time: formattedTime
    };
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const { date, time } = formatDateTime(appointment.datetime);
        return (
          <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{appointment.patient_name}</h3>
                <p className="text-sm text-gray-500">{appointment.type}</p>
                {appointment.is_completed && (
                  <span className="text-sm text-green-500">Completed</span>
                )}
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="font-medium">{date}</p>
                  <p className="text-sm text-gray-500">{time}</p>
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
                    onClick={() => handleDelete(appointment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AppointmentsList;