import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const Patients = () => {
  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      lastVisit: "2024-02-15",
      condition: "Hypertension"
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 32,
      lastVisit: "2024-02-14",
      condition: "Diabetes Type 2"
    },
    {
      id: 3,
      name: "David Wilson",
      age: 28,
      lastVisit: "2024-02-10",
      condition: "Asthma"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Patient Records</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle>Search Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search by name, condition..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="glass-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      <p className="text-sm text-gray-500">Age: {patient.age}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
                      <p className="text-sm font-medium text-primary">{patient.condition}</p>
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

export default Patients;