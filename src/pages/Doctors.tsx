import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";
import AddDoctorDialog from "@/components/AddDoctorDialog";
import { supabase } from "@/integrations/supabase/client";

interface Doctor {
  id: string;
  name: string;
  experience: string;
  type: string;
}

const Doctors = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(doctors);
    }
  }, [searchTerm, doctors]);

  const fetchDoctors = async () => {
    const { data, error } = await supabase
      .from('doctors')
      .select('*');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch doctors",
        variant: "destructive"
      });
      return;
    }

    setDoctors(data || []);
    setSearchResults(data || []);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete doctor",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Doctor removed",
      description: "The doctor has been successfully removed from the system.",
    });
    fetchDoctors();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Doctors Directory</h1>
            <AddDoctorDialog />
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
            {searchResults.map((doctor) => (
              <Card key={doctor.id} className="glass-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-500">Experience: {doctor.experience}</p>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
