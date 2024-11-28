import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import AppointmentsList from "@/components/AppointmentsList";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { useSearch } from "@/contexts/SearchContext";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  name?: string;
  patient_name?: string;
  type?: string;
  source: 'doctor' | 'patient' | 'appointment';
}

const Dashboard = () => {
  const date = new Date();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchTerm) {
      searchAllData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const searchAllData = async () => {
    const searchLower = searchTerm.toLowerCase();

    // Search doctors
    const { data: doctors } = await supabase
      .from('doctors')
      .select('*')
      .ilike('name', `%${searchLower}%`);

    // Search patients
    const { data: patients } = await supabase
      .from('patients')
      .select('*')
      .ilike('name', `%${searchLower}%`);

    // Search appointments
    const { data: appointments } = await supabase
      .from('appointments')
      .select('*')
      .ilike('patient_name', `%${searchLower}%`);

    const results: SearchResult[] = [
      ...(doctors?.map(d => ({ ...d, source: 'doctor' as const })) || []),
      ...(patients?.map(p => ({ ...p, source: 'patient' as const })) || []),
      ...(appointments?.map(a => ({ ...a, name: a.patient_name, source: 'appointment' as const })) || [])
    ];

    setSearchResults(results);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
                  placeholder="Search doctors, patients, appointments..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchResults.length > 0 && searchTerm && (
                  <div className="absolute w-full bg-white mt-1 rounded-md shadow-lg border p-2 space-y-2 max-h-60 overflow-auto z-50">
                    {searchResults.map((result) => (
                      <div key={`${result.source}-${result.id}`} className="p-2 hover:bg-gray-100 rounded">
                        <p className="font-medium">{result.name || result.patient_name}</p>
                        <p className="text-sm text-gray-500 capitalize">{result.source}</p>
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
              <StatsCards />

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
    </div>
  );
};

export default Dashboard;