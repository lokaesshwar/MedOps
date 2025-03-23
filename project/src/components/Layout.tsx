import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const signOut = useAuthStore(state => state.signOut);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Activity className="h-6 w-6" />
          MedOps
        </h1>
      </div>
      
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {[
            { icon: Activity, label: 'Dashboard', path: '/' },
            { icon: Calendar, label: 'Appointments', path: '/appointments' },
            { icon: Users, label: 'Patients', path: '/patients' },
            { icon: MessageSquare, label: 'Messages', path: '/messages' },
            { icon: FileText, label: 'Records', path: '/records' },
            { icon: Settings, label: 'Settings', path: '/settings' },
          ].map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}