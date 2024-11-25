import { Card } from "@/components/ui/card";

const AppointmentsList = () => {
  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      time: "09:00 AM",
      doctor: "Dr. Sarah Johnson",
      type: "Check-up"
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      time: "10:30 AM",
      doctor: "Dr. Michael Chen",
      type: "Follow-up"
    },
    {
      id: 3,
      patientName: "David Wilson",
      time: "02:00 PM",
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
              <p className="font-medium">{appointment.time}</p>
              <p className="text-sm text-gray-500">{appointment.doctor}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;