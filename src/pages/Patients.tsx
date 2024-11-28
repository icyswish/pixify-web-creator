import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AddPatientDialog from "@/components/AddPatientDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Patient {
  id: string;
  name: string;
  age: number;
}

const Patients = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.age.toString().includes(searchTerm)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(patients);
    }
  }, [searchTerm, patients]);

  const fetchPatients = async () => {
    const { data, error } = await supabase
      .from('patients')
      .select('*');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch patients",
        variant: "destructive"
      });
      return;
    }

    setPatients(data || []);
    setSearchResults(data || []);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete patient",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Patient removed",
      description: "The patient has been successfully removed from the system.",
    });
    fetchPatients();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Patients Directory</h1>
            <AddPatientDialog />
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
                  placeholder="Search by name or age..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {searchResults.map((patient) => (
              <Card key={patient.id} className="glass-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      <p className="text-sm text-gray-500">Age: {patient.age}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(patient.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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