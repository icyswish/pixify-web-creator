import { AppointmentListItem } from "./AppointmentListItem";

interface Appointment {
  id: string;
  patient_name: string;
  datetime: string;
  type: string;
  is_completed?: boolean;
}

interface AppointmentSectionProps {
  title: string;
  appointments: Appointment[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export const AppointmentSection = ({
  title,
  appointments,
  onDelete,
  onComplete
}: AppointmentSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      {appointments.map((appointment) => (
        <AppointmentListItem
          key={appointment.id}
          appointment={appointment}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};