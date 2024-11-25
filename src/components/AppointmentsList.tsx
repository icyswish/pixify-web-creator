import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const AppointmentsList = () => {
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

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{appointment.patientName}</h3>
              <p className="text-sm text-gray-500">{appointment.type}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {format(new Date(appointment.datetime), "EEEE, MMM d")}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(appointment.datetime), "h:mm a")}
              </p>
              <p className="text-sm text-gray-500">{appointment.doctor}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;