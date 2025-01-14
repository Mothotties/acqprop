import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Unauthorized from "@/pages/Unauthorized";
import { AuthGuard } from "@/components/AuthGuard";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Index />
            </AuthGuard>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;