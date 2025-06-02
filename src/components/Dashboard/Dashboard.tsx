import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Utensils,
  Baby,
  BookOpen,
  BellRing,
  Settings as SettingsIcon,
  LogOut,
  Camera,
  Handshake,
  Users,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Overview from "./pages/Overview";
import MealPlanner from "./pages/MealPlanner";
import DietTracking from "./pages/DietTracking";
import BabyProgress from "./pages/BabyProgress";
import Education from "./pages/Education";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import BarcodeTest from "./pages/BarcodeTest";
import Partnerships from "../Partnerships";
import BoardOfTrustees from "./pages/Our Teams";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "" },
    { icon: Calendar, label: "Meal Planner", path: "meal-planner" },
    { icon: Utensils, label: "Diet Tracking", path: "diet-tracking" },
    { icon: Baby, label: "Baby Progress", path: "baby-progress" },
    { icon: BookOpen, label: "Education", path: "education" },
    { icon: BellRing, label: "Notifications", path: "notifications" },
    { icon: Camera, label: "Barcode Test", path: "barcode-test" },
    { icon: Handshake, label: "Partnerships", path: "partnerships" },
    { icon: Users, label: "Board of Trustees", path: "board" },
    { icon: SettingsIcon, label: "Settings", path: "settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-purple-600">
              Welcome, {user?.name}!
            </h2>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg ${
                        isActive
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 w-full px-4 py-2"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route path="" element={<Overview />} />
            <Route path="meal-planner" element={<MealPlanner />} />
            <Route path="diet-tracking" element={<DietTracking />} />
            <Route path="baby-progress" element={<BabyProgress />} />
            <Route path="education" element={<Education />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="barcode-test" element={<BarcodeTest />} />
            <Route path="partnerships" element={<Partnerships />} />
            <Route path="board" element={<BoardOfTrustees />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
