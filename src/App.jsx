import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollRestoration from "./components/ScrollRestoration.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100">
      <Navbar />

      <main className="min-h-[70vh]">
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  );
}
