import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import Home from "./pages/home";
import Area from "./pages/area";
import Attractions from "./pages/attractions";
import Tickets from "./pages/tickets";
import About from "./pages/about";
import Schedule from "./pages/schedule";
import Admin from "./pages/admin";
import ProtectedRoute from "./components/protectedRoute";
import Login from "./pages/login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/area" element={<Area />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/about" element={<About />} />
            <Route                           // ← removed duplicate
              path="/schedule"
              element={
                <ProtectedRoute allowedRoles={["employee", "manager", "admin"]}>
                  <Schedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}