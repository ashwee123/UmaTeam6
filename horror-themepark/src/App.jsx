import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

import Home from "./pages/home";
import Area from "./pages/area";

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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}