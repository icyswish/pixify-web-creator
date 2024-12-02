import { useEffect, useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Appointment {
  id: string;
  patient_name: string;
  datetime: string;
  type: string;
  is_completed?: boolean;
}

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
    const subscription = supabase
      .channel('appointments_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, () => {
        fetchAppointments();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
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

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{appointment.patient_name}</h3>
              <p className="text-sm text-gray-500">{appointment.type}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(appointment.datetime), 'MMM dd, yyyy')}
              </p>
            </div>
            <div className="space-x-2">
              {!appointment.is_completed && (
                <button
                  onClick={() => handleComplete(appointment.id)}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => handleDelete(appointment.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {appointments.length === 0 && (
        <p className="text-center text-gray-500">No appointments for today</p>
      )}
    </div>
  );
};

export default AppointmentsList;