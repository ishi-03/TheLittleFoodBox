import { Routes, Route } from "react-router-dom";

// Customer Layout
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx";

// Customer Pages
import Menu from "./pages/Menu.jsx";
import MenuCard from "./pages/MenuCard.jsx";
import Contact from "./pages/Contact.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import MySubscription from "./pages/MySubscription.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/profile.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
// import CustomizeSubscription from "./admin/pages/CustomizeSubscription.jsx";
// Admin
import ProtectedAdmin from "./admin/components/ProtectedAdmin.jsx";
import AdminLayout from "./admin/layouts/AdminLayout.jsx";
import AdminSalads from "./admin/pages/AdminSalads.jsx";
import SubscriptionPlans from "./admin/pages/SubscriptionPlans.jsx";
import AdminSubscriptions from "./admin/pages/AdminSubscriptions.jsx";
import AdminUsers from "./admin/pages/AdminUsers.jsx";
// import Categories from "./admin/pages/Categories.jsx";
// import MenuItems from "./admin/pages/MenuItems.jsx";
// import Orders from "./admin/pages/Orders.jsx";
// import Users from "./admin/pages/Users.jsx";
// import AdminEvents from "./admin/pages/AdminEvents.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
export default function App() {
  return (
    <Routes>

      {/* ================= LANDING PAGE ================= */}
      <Route path="/" element={<Navbar />} />

      {/* ================= CUSTOMER WEBSITE ================= */}
      <Route element={<Layout />}>
        <Route path="/menu" element={<Menu />} />
        <Route path="/menucard" element={<MenuCard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscription" element={<Subscriptions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-subscription" element={<MySubscription />} />
        <Route path="/about" element={<About />} />
      </Route>
      {/* <Route
  path="/customize-subscription/:id"
  element={<CustomizeSubscription />}
/> */}
      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<ProtectedAdmin />}>
        <Route element={<AdminLayout />}>
<Route path="" element={<AdminDashboard />} />
 <Route
    path="users"
    element={<AdminUsers />}
  />

  <Route
    path="subscriptions"
    element={<AdminSubscriptions />}
  />
          <Route
            path="subscription-plans"
            element={<SubscriptionPlans />}
          />

          <Route
            path="salads"
            element={<AdminSalads />}
          />

          {/* Future Modules */}

          {/*
          <Route
            path="categories"
            element={<Categories />}
          />

          <Route
            path="menu-items"
            element={<MenuItems />}
          />

          <Route
            path="subscriptions"
            element={<Subscriptions />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="users"
            element={<Users />}
          />

          <Route
            path="events"
            element={<AdminEvents />}
          />
          */}

        </Route>
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  );
}