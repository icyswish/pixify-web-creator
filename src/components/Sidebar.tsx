import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings,
  UserCircle
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-primary text-white min-h-screen p-4">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-4">Staff Directory</h2>
          
          <div className="space-y-2">
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
          </div>
        </div>

        <nav className="space-y-2">
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