import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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
import { useState } from "react";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const date = format(new Date(datetime), 'MMM dd, yyyy');

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="p-4 border rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{patient_name}</h3>
            <p className="text-sm text-gray-500">{type}</p>
            <p className="text-sm text-gray-500">{date}</p>
            {is_completed && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            )}
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
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

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
    </>
  );
};