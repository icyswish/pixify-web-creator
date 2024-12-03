import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AddPatientDialog from "@/components/AddPatientDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Patient {
  id: string;
  name: string;
  age: number;
  created_at: string;
}

const Patients = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
    document.title = "Patients | Dr Cloud Management";
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleDelete = (id: string) => {
    setPatientToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!patientToDelete) return;

    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', patientToDelete);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete patient",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Patient deleted successfully",
    });
    setDeleteDialogOpen(false);
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
                  placeholder="Search by patient name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {searchResults.map((patient) => (
              <Card key={patient.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-500">Age: {patient.age}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">
                      {new Date(patient.created_at).toLocaleDateString()}
                    </p>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(patient.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the patient's record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Patients;