import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx"; // landing page

import Menu from "./pages/Menu.jsx";
import MenuCard from "./pages/MenuCard.jsx";
import Contact from "./pages/Contact.jsx";
import Subscriptions from "./pages/Subscriptions";
import MySubscription from "./pages/MySubscription.jsx";
import Login from "./pages/Login";
import Profile from "./pages/profile.jsx";
import Register from "./pages/Register";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Routes>

      {/* LANDING PAGE (NO NAV) */}
      <Route path="/" element={<Navbar />} />

      {/* WITH NAV */}
      <Route element={<Layout />}>
        <Route path="/menu" element={<Menu />} />
        <Route path="/menucard" element={<MenuCard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscription" element={<Subscriptions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-subscription" element={<MySubscription />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* WITHOUT NAV */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}