import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardApi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const data = await getDashboard();

    if (data.success) {
      setStats(data.stats);
      setRecent(data.recentSubscriptions);
    }
  };

  const cards = [
    {
      title: "Customers",
      value: stats.totalUsers || 0,
      color: "#3F6C51",
      icon: "👥",
      path: "/admin/users",
    },
    {
      title: "Plans",
      value: stats.totalPlans || 0,
      color: "#C97C5D",
      icon: "📦",
      path: "/admin/subscription-plans",
    },
    {
      title: "Salads",
      value: stats.totalSalads || 0,
      color: "#7A9B57",
      icon: "🥗",
      path: "/admin/salads",
    },
    {
      title: "Subscriptions",
      value: stats.activeSubscriptions || 0,
      color: "#8A6BAE",
      icon: "💳",
      path: "/admin/subscriptions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F3] via-[#F5F2EA] to-[#EEF2E9] p-6 md:p-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9B57]">
              Admin Overview
            </p>
            <h1 className="font-serif text-4xl font-bold text-[#2A2A28] md:text-5xl">
              Dashboard
            </h1>
            <p className="mt-2 text-[#6B6B65]">
              Welcome back, Admin 👋
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5E1D6] bg-white/70 px-5 py-3 text-right shadow-sm backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-[#9A9A92]">
              Today
            </p>
            <p className="font-serif text-lg font-semibold text-[#2A2A28]">
              {new Date().toDateString()}
            </p>
          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {cards.map((card) => (

            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#ECE8DC] bg-white p-6 shadow-[0_2px_10px_rgba(42,42,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(42,42,40,0.12)]"
            >

              <div
                className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl"
                style={{ backgroundColor: card.color }}
              />

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium uppercase tracking-wide text-[#9A9A92]">
                    {card.title}
                  </p>

                  <h1
                    className="mt-3 font-serif text-4xl font-bold"
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </h1>

                </div>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${card.color}1A` }}
                >
                  {card.icon}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Quick Actions */}

        <div className="mt-8 rounded-3xl border border-[#ECE8DC] bg-white p-6 shadow-[0_2px_10px_rgba(42,42,40,0.05)] md:p-8">

          <h2 className="mb-5 font-serif text-2xl font-bold text-[#2A2A28]">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                navigate("/admin/salads")
              }
              className="flex items-center gap-2 rounded-xl bg-[#3F6C51] px-5 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#345a43] hover:shadow-md active:scale-95"
            >
              <span>➕</span> Add Salad
            </button>

            <button
              onClick={() =>
                navigate("/admin/subscription-plans")
              }
              className="flex items-center gap-2 rounded-xl bg-[#C97C5D] px-5 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#b56a4d] hover:shadow-md active:scale-95"
            >
              <span>➕</span> Add Plan
            </button>

            <button
              onClick={() =>
                navigate("/admin/subscriptions")
              }
              className="flex items-center gap-2 rounded-xl bg-[#8A6BAE] px-5 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#785a9c] hover:shadow-md active:scale-95"
            >
              <span>📋</span> View Subscriptions
            </button>

          </div>

        </div>

        {/* Recent */}

        <div className="mt-8 rounded-3xl border border-[#ECE8DC] bg-white p-6 shadow-[0_2px_10px_rgba(42,42,40,0.05)] md:p-8">

          <h2 className="mb-5 font-serif text-2xl font-bold text-[#2A2A28]">
            Recent Subscriptions
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b border-[#ECE8DC]">

                  <th className="p-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Customer
                  </th>

                  <th className="p-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Plan
                  </th>

                  <th className="p-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recent.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-[#F3F1E9] transition-colors hover:bg-[#FAF8F3]"
                  >

                    <td className="p-3 font-medium text-[#2A2A28]">
                      {item.userId?.name}
                    </td>

                    <td className="p-3 text-[#4A4A45]">
                      {item.planId?.name}
                    </td>

                    <td className="p-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          item.status === "active"
                            ? "bg-[#EAF2E7] text-[#3F6C51]"
                            : item.status === "paused"
                            ? "bg-[#FBF1E3] text-[#B5822E]"
                            : "bg-[#FBEAE7] text-[#C0503F]"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))}

                {recent.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-sm text-[#9A9A92]">
                      No recent subscriptions yet.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}