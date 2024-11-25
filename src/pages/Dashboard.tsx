import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const date = new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/d1060129-3244-47c3-aff1-6a747b43c5c1.png"
              alt="Dr.Cloud Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search (Doctor, Patient, etc.)"
                className="pl-10 w-[300px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Records of Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">128</p>
                  <p className="text-sm text-gray-500">Total patients</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Scheduled Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-500">Doctors on duty today</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Scheduled Nurse</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500">Nurses on duty today</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Appointment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-500">Appointments today</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;