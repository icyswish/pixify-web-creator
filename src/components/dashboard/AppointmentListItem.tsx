import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface AppointmentListItemProps {
  id: string;
  patient_name: string;
  datetime: string;
  type: string;
  is_completed?: boolean;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export const AppointmentListItem = ({
  id,
  patient_name,
  datetime,
  type,
  is_completed,
  onDelete,
  onComplete
}: AppointmentListItemProps) => {
  const date = format(new Date(datetime), 'MMM dd, yyyy');

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{patient_name}</h3>
          <p className="text-sm text-gray-500">{type}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="space-x-2">
          {!is_completed && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onComplete(id)}
            >
              Complete
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};