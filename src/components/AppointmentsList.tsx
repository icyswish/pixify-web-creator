import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format, utcToZonedTime } from "date-fns-tz";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Appointment {
  id: string;
  patient_name: string;
  datetime: string;
  type: string;
}

const AppointmentsList = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const timeZone = 'Asia/Manila';

  useEffect(() => {
    fetchAppointments();
    
    // Subscribe to realtime changes
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
      title: "Appointment deleted",
      description: "The appointment has been successfully deleted.",
    });
    fetchAppointments();
  };

  const formatDateTime = (datetime: string) => {
    const zonedTime = utcToZonedTime(new Date(datetime), timeZone);
    return {
      date: format(zonedTime, "EEEE, MMM d", { timeZone }),
      time: format(zonedTime, "h:mm a", { timeZone })
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
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="font-medium">{date}</p>
                  <p className="text-sm text-gray-500">{time}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(appointment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AppointmentsList;