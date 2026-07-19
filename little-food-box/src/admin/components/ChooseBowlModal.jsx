import React, { useEffect, useState } from "react";
export default function ChooseBowlModal({
  open,
  salads,
  onClose,
  onSelect,
}) {
    const [selectedSalad, setSelectedSalad] = useState(null);

useEffect(() => {
  if (!open) {
    setSelectedSalad(null);
  }
}, [open]);

if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end"
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 60,
            height: 5,
            background: "#ddd",
            borderRadius: 50,
            margin: "0 auto 20px",
          }}
        />

        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Choose Your Bowl
        </h2>
        
{selectedSalad ? (
  <>
    <button
      className="mb-4 text-sm font-medium text-emerald-700"
      onClick={() => setSelectedSalad(null)}
    >
      ← Back
    </button>

    <img
      src={selectedSalad.image}
      alt={selectedSalad.name}
      className="h-72 w-full rounded-2xl object-cover"
    />

    <h2 className="mt-4 text-2xl font-bold">
      {selectedSalad.name}
    </h2>

    <p className="mt-2 text-gray-500">
      {selectedSalad.description}
    </p>

    <div className="mt-5 grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-stone-100 p-3">
        🔥 {selectedSalad.calories} kcal
      </div>

      <div className="rounded-xl bg-stone-100 p-3">
        💪 {selectedSalad.protein} g
      </div>

      <div className="rounded-xl bg-stone-100 p-3">
        🌾 {selectedSalad.carbs} g
      </div>

      <div className="rounded-xl bg-stone-100 p-3">
        🥑 {selectedSalad.fat} g
      </div>
    </div>

    {selectedSalad.ingredients?.length > 0 && (
      <>
        <h3 className="mt-6 font-semibold">Ingredients</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {selectedSalad.ingredients.map((item) => (
            <span
              key={item}
              className="rounded-full bg-green-100 px-3 py-1 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </>
    )}
{selectedSalad.dressings?.length > 0 && (
  <>
    <h3 className="mt-6 font-semibold">
      Available Dressings
    </h3>

    <div className="mt-2 flex flex-wrap gap-2">
      {selectedSalad.dressings.map((dressing) => (
        <span
          key={dressing}
          className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
        >
          🥣 {dressing}
        </span>
      ))}
    </div>
  </>
)}
    <button
      className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white"
      onClick={() => onSelect(selectedSalad)}
    >
      Select This Bowl
    </button>
  </>
) : (
  <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 16,
      }}
    >
      {salads.map((salad) => (
        <div
          key={salad._id}
          onClick={() => setSelectedSalad(salad)}
          style={{
            cursor: "pointer",
            border: "1px solid #eee",
            borderRadius: 18,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <img
            src={salad.image}
            alt={salad.name}
            style={{
              width: "100%",
              aspectRatio: "1",
              objectFit: "cover",
            }}
          />

          <div className="px-3 pb-4">
            <h3 className="font-semibold">
              {salad.name}
            </h3>

            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
              {salad.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold text-green-700">
                {salad.calories} kcal
              </span>

              <button
                className="rounded-full bg-emerald-600 px-3 py-1 text-xs text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSalad(salad);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ height: 30 }} />
  </>
)}
      </div>
    </div>
  );
}