import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const AppointmentsList = () => {
  const { toast } = useToast();
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

  const handleDelete = (id: number) => {
    // Here you would typically make an API call to delete the appointment
    toast({
      title: "Appointment deleted",
      description: "The appointment has been successfully deleted.",
    });
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{appointment.patientName}</h3>
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
                <p className="text-sm text-gray-500">{appointment.doctor}</p>
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