import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
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

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{appointment.patient_name}</h3>
              <p className="text-sm text-gray-500">{appointment.type}</p>
            </div>
            <div className="text-right flex items-center gap-4">
              <div>
                <p className="font-medium">
                  {format(new Date(appointment.datetime), "EEEE, MMM d")}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(appointment.datetime), "h:mm a")}
                </p>
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
      ))}
    </div>
  );
};

export default AppointmentsList;