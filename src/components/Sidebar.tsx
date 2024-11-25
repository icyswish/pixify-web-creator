import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  Calendar,
  Menu,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const navigate = useNavigate();

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
        <div className="space-y-8 mt-16">
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;