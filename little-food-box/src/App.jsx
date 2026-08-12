import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Customer Layout
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx";

// Customer Pages
const MenuCard = lazy(() => import("./pages/MenuCard.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Subscriptions = lazy(() => import("./pages/Subscriptions.jsx"));
const MySubscription = lazy(() => import("./pages/MySubscription.jsx"));
const GrazingTable = lazy(() => import("./pages/GrazingTable.jsx"));
const MealsOnWheels = lazy(() => import("./pages/MealsOnWheels.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Profile = lazy(() => import("./pages/profile.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const ManageSubscription = lazy(() =>
  import("./pages/ManageSubscription.jsx")
);
const PrivacyPolicy = lazy(() =>
  import("./pages/footer/PrivacyPolicy.jsx")
);
const Terms = lazy(() => import("./pages/footer/Terms.jsx"));
const FAQs = lazy(() => import("./pages/footer/FAQ.jsx"));
const Platters = lazy(() => import("./pages/Platters.jsx"));

// Admin
const ProtectedAdmin = lazy(() =>
  import("./admin/components/ProtectedAdmin.jsx")
);

const AdminLayout = lazy(() =>
  import("./admin/layouts/AdminLayout.jsx")
);

const AdminDashboard = lazy(() =>
  import("./admin/pages/AdminDashboard.jsx")
);

const AdminUsers = lazy(() =>
  import("./admin/pages/AdminUsers.jsx")
);

const AdminSubscriptions = lazy(() =>
  import("./admin/pages/AdminSubscriptions.jsx")
);

const SubscriptionPlans = lazy(() =>
  import("./admin/pages/SubscriptionPlans.jsx")
);

const AdminSalads = lazy(() =>
  import("./admin/pages/AdminSalads.jsx")
);

const AdminMenuItems = lazy(() =>
  import("./admin/pages/AdminMenuItems.jsx")
);


// ─────────────────────────────────────────────
// Loading Screen
// ─────────────────────────────────────────────

function PageLoader() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f3ed",
        color: "#7a6a52",
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px",
      }}
    >
      Loading...
    </div>
  );
}


// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ================= LANDING PAGE ================= */}
        <Route path="/" element={<Navbar />} />


        {/* ================= CUSTOMER WEBSITE ================= */}

        <Route element={<Layout />}>

          <Route
            path="/menucard"
            element={<MenuCard />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/subscription"
            element={<Subscriptions />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/my-subscription"
            element={<MySubscription />}
          />

          <Route
            path="/grazing-tables"
            element={<GrazingTable />}
          />

          <Route
            path="/meals-on-wheels"
            element={<MealsOnWheels />}
          />

          <Route
            path="/platters"
            element={<Platters />}
          />

          <Route
            path="/manage-subscription/:id"
            element={<ManageSubscription />}
          />

          <Route
            path="/about"
            element={<About />}
          />

        </Route>


        {/* ================= FOOTER PAGES ================= */}

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/faqs"
          element={<FAQs />}
        />


        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/checkout/:id"
          element={<Checkout />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={<ProtectedAdmin />}
        >

          <Route element={<AdminLayout />}>

            <Route
              path=""
              element={<AdminDashboard />}
            />

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

            <Route
              path="menu-items"
              element={<AdminMenuItems />}
            />

          </Route>

        </Route>


        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <h1 style={{ padding: "40px" }}>
              404 Not Found
            </h1>
          }
        />

      </Routes>
    </Suspense>
  );
}