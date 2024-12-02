import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle } from "lucide-react";
import { format, subHours } from "date-fns";

interface Appointment {
  id: string;
  patient_name: string;
  datetime: string;
  type: string;
  is_completed?: boolean;
}

interface AppointmentListItemProps {
  appointment: Appointment;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export const AppointmentListItem = ({ 
  appointment, 
  onDelete, 
  onComplete 
}: AppointmentListItemProps) => {
  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    const adjustedDate = subHours(date, 8);
    return format(adjustedDate, 'h:mm a');
  };

  return (
    <div className="p-4 border rounded-lg flex justify-between items-center">
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
            onClick={() => onComplete(appointment.id)}
            className="text-green-500 hover:text-green-600"
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(appointment.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};