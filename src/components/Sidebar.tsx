import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  Calendar,
  Menu,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className={`w-64 bg-primary text-white min-h-screen p-4 fixed left-0 top-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center mb-8 mt-16">
          <img 
            src="/lovable-uploads/92bbc203-c641-4fd1-8ec4-d7f9898186a9.png" 
            alt="Dr Cloud Logo" 
            className="h-12 w-auto"
          />
        </div>

        <div className="space-y-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>

          <nav className="space-y-2">
            <Link to="/doctors" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg">
              <Users className="w-5 h-5" />
              <span>Doctors</span>
            </Link>
            <Link to="/patients" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg">
              <Users className="w-5 h-5" />
              <span>Patients</span>
            </Link>
            <Link to="/appointments" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg">
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </Link>
          </nav>

          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-300 hover:text-red-400 hover:bg-red-900/20" 
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;