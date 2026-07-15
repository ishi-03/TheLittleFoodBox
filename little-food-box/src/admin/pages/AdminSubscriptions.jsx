import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";import {
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../services/subscriptionApi";

import MealPlanModal from "../components/MealPlanModal.jsx";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedSubscription, setSelectedSubscription] =
    useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    setLoading(true);

    const data = await getSubscriptions();

    if (data.success) {
      setSubscriptions(data.subscriptions);
    }

    setLoading(false);
  };

  const handleStatus = async (id, status) => {
    const data = await updateSubscription(id, {
      status,
    });

    if (data.success) {
      loadSubscriptions();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete subscription?"))
      return;

    const data = await deleteSubscription(id);

    if (data.success) {
      loadSubscriptions();
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FAF8F3] via-[#F5F2EA] to-[#EEF2E9]">
        <div className="flex items-center gap-3 text-[#6B6B65]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#3F6C51] border-t-transparent" />
          <span className="font-medium">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F3] via-[#F5F2EA] to-[#EEF2E9] p-6 md:p-10">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6BAE]">
              Customer Accounts
            </p>
            <h1 className="font-serif text-3xl font-bold text-[#2A2A28] md:text-4xl">
              Subscriptions
            </h1>

            <p className="mt-1 text-[#8A8A82]">
              Manage customer subscriptions
            </p>
          </div>

          <div className="self-start rounded-2xl bg-[#3F6C51] px-5 py-3 text-white shadow-sm sm:self-auto">
            <p className="text-xs uppercase tracking-wide text-white/70">
              Total
            </p>
            <p className="font-serif text-xl font-bold">
              {subscriptions.length}
            </p>
          </div>

        </div>

        <div className="overflow-hidden rounded-3xl border border-[#ECE8DC] bg-white shadow-[0_2px_10px_rgba(42,42,40,0.05)]">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[760px] border-collapse text-sm">

              <thead className="bg-[#FAF8F3]">

                <tr>

                  <th className="border-b border-[#ECE8DC] p-4 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Customer
                  </th>

                  <th className="border-b border-[#ECE8DC] p-4 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Plan
                  </th>

                  <th className="border-b border-[#ECE8DC] p-4 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Slot
                  </th>

                  <th className="border-b border-[#ECE8DC] p-4 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Start Date
                  </th>

                  <th className="border-b border-[#ECE8DC] p-4 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Status
                  </th>

                  <th className="border-b border-[#ECE8DC] p-4 text-center text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>
                            {subscriptions.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-t border-[#F3F1E9] transition-colors hover:bg-[#FAF8F3]"
                  >
                    <td className="p-4">
                      <div className="font-semibold text-[#2A2A28]">
                        {sub.userId?.name}
                      </div>

                      <div className="text-sm text-[#9A9A92]">
                        {sub.userId?.email}
                      </div>
                    </td>

                    <td className="p-4 text-[#4A4A45]">
                      {sub.planId?.name}
                    </td>

                    <td className="p-4 text-[#4A4A45]">
                      {sub.deliverySlotId?.startTime}
                      {" - "}
                      {sub.deliverySlotId?.endTime}
                    </td>

                    <td className="p-4 text-[#4A4A45]">
                      {new Date(
                        sub.startDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          sub.status === "active"
                            ? "bg-[#EAF2E7] text-[#3F6C51]"
                            : sub.status === "paused"
                            ? "bg-[#FBF1E3] text-[#B5822E]"
                            : "bg-[#FBEAE7] text-[#C0503F]"
                        }`}
                      >
                        {sub.status}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex flex-wrap justify-center gap-2">

                        <button
                          onClick={() => {
                            setSelectedSubscription(sub);
                            setShowModal(true);
                          }}
                          className="rounded-lg border border-[#CBD9E8] bg-[#EEF3F9] px-3 py-2 text-sm font-semibold text-[#3A6EA5] transition-colors hover:border-[#B4C9E0] hover:bg-[#E2EAF4]"
                        >
                          View
                        </button>

                        {sub.status === "active" && (
                          <button
                            onClick={() =>
                              handleStatus(
                                sub._id,
                                "paused"
                              )
                            }
                            className="rounded-lg border border-[#F0E2C4] bg-[#FBF1E3] px-3 py-2 text-sm font-semibold text-[#B5822E] transition-colors hover:border-[#E5D2A6] hover:bg-[#F6E7CC]"
                          >
                            Pause
                          </button>
                        )}

                        {sub.status === "paused" && (
                          <button
                            onClick={() =>
                              handleStatus(
                                sub._id,
                                "active"
                              )
                            }
                            className="rounded-lg border border-[#CFE0C6] bg-[#EAF2E7] px-3 py-2 text-sm font-semibold text-[#3F6C51] transition-colors hover:border-[#BBD6AE] hover:bg-[#DEEBD8]"
                          >
                            Resume
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleDelete(sub._id)
                          }
                          className="rounded-lg border border-[#F0D3CC] bg-[#FBEAE7] px-3 py-2 text-sm font-semibold text-[#C0503F] transition-colors hover:border-[#E8BFB5] hover:bg-[#F7DDD6]"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        <MealPlanModal
          open={showModal}
          onClose={() => setShowModal(false)}
          subscription={selectedSubscription}
        />

      </div>

    </div>
  );
}