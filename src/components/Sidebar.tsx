import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings,
  UserCircle,
  ChevronDown,
  ChevronRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sidebar = () => {
  const [isStaffOpen, setIsStaffOpen] = useState(false);

  return (
    <div className="w-64 bg-primary text-white min-h-screen p-4">
      <div className="space-y-8">
        <Collapsible
          open={isStaffOpen}
          onOpenChange={setIsStaffOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded-lg">
            <span className="text-xl font-semibold">Staff Directory</span>
            {isStaffOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
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
  );
};

export default Sidebar;