import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx";

// import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import MenuCard from "./pages/MenuCard.jsx";
import Contact from "./pages/Contact.jsx";
import Subscriptions from "./pages/Subscriptions";
import MySubscription from "./pages/MySubscription.jsx";
import Login from "./pages/Login";
import Profile from "./pages/profile.jsx";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
  {/* MAIN APP WITH NAVBAR */}
  <Route path="/" element={<Layout />}>
    {/* <Route index element={<Home />} /> */}
    <Route path="menu" element={<Menu />} />
    <Route path="menucard" element={<MenuCard />} />
    <Route path="contact" element={<Contact />} />
    <Route path="subscription" element={<Subscriptions />} />
    <Route path="profile" element={<Profile />} />
    <Route path="my-subscription" element={<MySubscription />} />
  </Route>

  {/* WITHOUT NAVBAR */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>
  );
}