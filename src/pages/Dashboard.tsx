import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import AppointmentsList from "@/components/AppointmentsList";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearch } from "@/contexts/SearchContext";

const Dashboard = () => {
  const date = new Date();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();

  // Mock data for demonstration
  const mockData = {
    doctors: [
      { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", experience: "15 years" },
      { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrician", experience: "10 years" },
      { id: 3, name: "Dr. Emily Rodriguez", specialty: "Neurologist", experience: "12 years" }
    ],
    patients: [
      { id: 1, name: "John Smith", age: 45, condition: "Hypertension" },
      { id: 2, name: "Maria Garcia", age: 32, condition: "Diabetes Type 2" },
      { id: 3, name: "David Wilson", age: 28, condition: "Asthma" }
    ]
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [
      ...mockData.doctors.filter(doc => 
        doc.name.toLowerCase().includes(value.toLowerCase())
      ).map(doc => ({ ...doc, type: 'doctor' })),
      ...mockData.patients.filter(patient => 
        patient.name.toLowerCase().includes(value.toLowerCase())
      ).map(patient => ({ ...patient, type: 'patient' }))
    ];

    setSearchResults(results);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setShowDialog(true);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search (Doctor, Patient, etc.)"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border">
                    {searchResults.map((item) => (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                      >
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Link to="/patients" className="block">
                  <Card className="glass-card hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>Records of Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">128</p>
                      <p className="text-sm text-gray-500">Total patients</p>
                    </CardContent>
                  </Card>
                </Link>

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

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <AppointmentsList />
                </CardContent>
              </Card>
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.type === 'doctor' ? (
              <>
                <p><span className="font-medium">Specialty:</span> {selectedItem.specialty}</p>
                <p><span className="font-medium">Experience:</span> {selectedItem.experience}</p>
              </>
            ) : (
              <>
                <p><span className="font-medium">Age:</span> {selectedItem?.age}</p>
                <p><span className="font-medium">Condition:</span> {selectedItem?.condition}</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
