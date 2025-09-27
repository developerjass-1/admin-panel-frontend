import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/services/ProtectedRoute";
import Dashboard from "@/layouts/dashboard"; 
import Auth from "@/layouts/auth"; 

function App() {
  return (
    <Routes>
      {/* Dashboard pages */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Auth pages - no /auth prefix */}
      <Route path="/*" element={<Auth />} />

      {/* Catch-all -> redirect */}
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default App;
