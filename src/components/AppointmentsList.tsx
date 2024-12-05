import { useEffect, useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchAppointments();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('appointments_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments' 
        }, 
        () => {
          console.log('Received real-time update');
          fetchAppointments();
        }
      )
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

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .gte('datetime', today.toISOString())
        .lt('datetime', tomorrow.toISOString())
        .order('datetime', { ascending: true });

      if (error) throw error;

      console.log('Fetched appointments:', data);
      setAppointments(data || []);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive"
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAppointments();
    setIsRefreshing(false);
    toast({
      title: "Success",
      description: "Appointments refreshed successfully",
    });
  };

  const handleDeleteClick = (id: string) => {
    setAppointmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
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
    await fetchAppointments();
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
    await fetchAppointments();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {appointments.map((appointment) => (
        <div key={appointment.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{appointment.patient_name}</h3>
              <p className="text-sm text-gray-500">{appointment.type}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(appointment.datetime), 'MMM dd, yyyy')}
              </p>
              {appointment.is_completed && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              )}
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
                onClick={() => handleDeleteClick(appointment.id)}
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
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AppointmentsList;