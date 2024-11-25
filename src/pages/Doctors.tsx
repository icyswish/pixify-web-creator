import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AddButton from "@/components/AddButton";
import { useSearch } from "@/contexts/SearchContext";
import { useToast } from "@/components/ui/use-toast";

const Doctors = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Pediatrician",
      experience: "10 years"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      experience: "12 years"
    }
  ]);

  const { searchTerm, setSearchTerm } = useSearch();
  const { toast } = useToast();

  const handleAddDoctor = () => {
    const newDoctor = {
      id: doctors.length + 1,
      name: "New Doctor",
      specialty: "Specialty",
      experience: "0 years"
    };
    setDoctors([...doctors, newDoctor]);
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Doctors Directory</h1>
            <AddButton label="Add New Doctor" onClick={handleAddDoctor} />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle>Search Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search by name, specialty..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="glass-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Experience: {doctor.experience}</p>
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

export default Doctors;