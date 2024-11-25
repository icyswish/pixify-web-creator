import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings,
  UserCircle,
  Menu,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

          <Collapsible
            open={isStaffOpen}
            onOpenChange={setIsStaffOpen}
            className="space-y-2"
          >
            <CollapsibleTrigger className="flex items-center w-full p-2 hover:bg-white/10 rounded-lg">
              <span className="text-xl font-semibold">Dr. Cloud</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                <UserCircle className="w-5 h-5" />
                <span>Dr. Sarah Johnson</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                <UserCircle className="w-5 h-5" />
                <span>Dr. Michael Chen</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                <UserCircle className="w-5 h-5" />
                <span>Dr. Emily Rodriguez</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

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
            <Link to="/records" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg">
              <ClipboardList className="w-5 h-5" />
              <span>Medical Records</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;