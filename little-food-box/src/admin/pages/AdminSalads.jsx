import { useEffect, useState } from "react";

import SaladModal from "../components/SaladModal";

import {
  getSalads,
  createSalad,
  updateSalad,
  deleteSalad,
} from "../services/saladApi";

export default function AdminSalads() {
  const [salads, setSalads] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingSalad, setEditingSalad] = useState(null);

  const loadSalads = async () => {
    try {
      const data = await getSalads();

      if (data.success) {
        setSalads(data.salads);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSalads();
  }, []);

  const saveSalad = async (form) => {
    let data;

    if (editingSalad) {
      data = await updateSalad(editingSalad._id, form);
    } else {
      data = await createSalad(form);
    }

    if (data.success) {
      alert(
        editingSalad
          ? "Salad Updated"
          : "Salad Created"
      );

      setOpen(false);
      setEditingSalad(null);

      loadSalads();
    } else {
      alert(data.message);
    }
  };

  const editSalad = (salad) => {
    setEditingSalad(salad);
    setOpen(true);
  };

  const removeSalad = async (id) => {
    const ok = window.confirm(
      "Delete this salad?"
    );

    if (!ok) return;

    const data = await deleteSalad(id);

    if (data.success) {
      loadSalads();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F3] via-[#F5F2EA] to-[#EEF2E9] p-6 md:p-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9B57]">
              Menu
            </p>

            <h1 className="font-serif text-3xl font-bold text-[#2A2A28] md:text-4xl">
              Salads
            </h1>

            <p className="mt-1 text-[#8A8A82]">
              Manage all salads
            </p>

          </div>

          <button
            onClick={() => {
              setEditingSalad(null);
              setOpen(true);
            }}
            className="inline-flex items-center gap-1.5 self-start rounded-xl bg-[#3F6C51] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#345a43] hover:shadow-md active:translate-y-px sm:self-auto"
          >
            <span className="text-base leading-none">+</span>
            Add Salad
          </button>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl border border-[#ECE8DC] bg-white shadow-[0_2px_10px_rgba(42,42,40,0.05)]">

          <div className="overflow-x-auto">

            <table className="min-w-full border-collapse">

              <thead className="bg-[#FAF8F3]">

                <tr>

                  <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Image
                  </th>

                  <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Name
                  </th>

                  <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Category
                  </th>

                  <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Nutrition
                  </th>

                  <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Options
                  </th>

                  <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Status
                  </th>

                  <th className="border-b border-[#ECE8DC] px-4 py-3.5 text-left text-[12.5px] font-semibold uppercase tracking-wide text-[#9A9A92]">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {salads.length === 0 ? (

                  <tr>

                    <td colSpan="7">
                      <div className="px-4 py-12 text-center">
                        <div className="mb-2 text-3xl">🥗</div>
                        <p className="mb-1 text-[15px] font-semibold text-[#4A4A45]">
                          No salads found
                        </p>
                        <p className="text-[13px] text-[#9A9A92]">
                          Add your first salad to build out the menu.
                        </p>
                      </div>
                    </td>

                  </tr>

                ) : (

                  salads.map((salad) => (

                    <tr
                      key={salad._id}
                      className="border-t border-[#F3F1E9] transition-colors hover:bg-[#FAF8F3]"
                    >

                      {/* Image */}

                      <td className="px-4 py-3">

                        <img
                          src={
                            salad.image ||
                            "https://placehold.co/70x70"
                          }
                          alt=""
                          className="h-16 w-16 rounded-xl border border-[#ECE8DC] object-cover"
                        />

                      </td>

                      {/* Name */}

                      <td className="px-4 py-3">

                        <div className="font-semibold text-[#2A2A28]">
                          {salad.name}
                        </div>

                        <div className="text-sm text-[#9A9A92]">
                          {salad.ingredients?.length || 0} Ingredients
                        </div>

                      </td>

                      {/* Category */}

                      <td className="px-4 py-3 text-[#4A4A45]">
                        {salad.category}
                      </td>

                      {/* Nutrition */}

                     <td className="px-4 py-3">
  <div className="space-y-1 text-sm">

{(salad.calories || salad.protein) ? (
  <div className="space-y-1 text-sm">
    {salad.calories && (
      <div className="flex items-center gap-2">
        🔥 <span>{salad.calories} kcal</span>
      </div>
    )}

    {salad.protein && (
      <div className="flex items-center gap-2">
        🥩 <span>{salad.protein} g Protein</span>
      </div>
    )}
  </div>
) : (
  <span className="text-sm text-gray-400">
    —
  </span>
)}

  </div>
</td>

                      {/* Vegan Jain */}

                      <td className="px-4 py-3">

                      <div className="flex flex-wrap gap-2">

{salad.variants?.regular && (
<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
🥗 Regular
</span>
)}

{salad.variants?.vegan && (
<span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium">
🌱 Vegan
</span>
)}

{salad.variants?.jain && (
<span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-medium">
🪔 Jain
</span>
)}

</div>

                      </td>

                      {/* Status */}

                      <td className="px-4 py-3">

                        {salad.active ? (

                          <span className="rounded-full border border-[#DCE8D4] bg-[#EAF2E7] px-3 py-1 text-xs font-medium text-[#3F6C51]">
                            Active
                          </span>

                        ) : (

                          <span className="rounded-full border border-[#F0D3CC] bg-[#FBEAE7] px-3 py-1 text-xs font-medium text-[#C0503F]">
                            Inactive
                          </span>

                        )}

                      </td>

                      {/* Actions */}

                      <td className="px-4 py-3">

                        <div className="flex flex-wrap gap-2">

                          <button
                            onClick={() =>
                              editSalad(salad)
                            }
                            className="rounded-lg border border-[#CBD9E8] bg-[#EEF3F9] px-3 py-1.5 text-xs font-semibold text-[#3A6EA5] transition-colors hover:border-[#B4C9E0] hover:bg-[#E2EAF4]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              removeSalad(salad._id)
                            }
                            className="rounded-lg border border-[#F0D3CC] bg-[#FBEAE7] px-3 py-1.5 text-xs font-semibold text-[#C0503F] transition-colors hover:border-[#E8BFB5] hover:bg-[#F7DDD6]"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        <SaladModal
          open={open}
          editingSalad={editingSalad}
          onClose={() => {
            setOpen(false);
            setEditingSalad(null);
          }}
          onSave={saveSalad}
        />

      </div>

    </div>
  );
}