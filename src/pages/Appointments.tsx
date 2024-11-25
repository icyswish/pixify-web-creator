import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const Appointments = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Appointments</h1>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Schedule New Appointment
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle>Search Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search by patient, doctor..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="glass-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <p className="text-sm text-gray-500">{appointment.doctor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Appointments;