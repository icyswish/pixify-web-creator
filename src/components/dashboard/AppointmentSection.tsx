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
          id={appointment.id}
          patient_name={appointment.patient_name}
          datetime={appointment.datetime}
          type={appointment.type}
          is_completed={appointment.is_completed}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};