import React from "react";
import {
  HashRouter as HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { BrowserRouter as Routes, Route, Navigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Innovation from "./components/Innovation";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Dashboard/Dashboard";
import Presentation from "./components/Presentation";
import Partnerships from "./components/Partnerships";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthStore } from "./store/authStore";

function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  const { isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = (user: { name: string; email: string }) => {
    login(user);
    setShowLogin(false);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-purple-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  MomBaby Care
                </span>
              </div>
              {!isAuthenticated ? (
                <button
                  onClick={() => setShowLogin(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => logout()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Hero />
                  <Features />
                  <Innovation />
                </>
              )
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </HashRouter>
  );
}

export default App;
