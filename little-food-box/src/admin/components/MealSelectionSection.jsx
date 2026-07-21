import React from "react";
import { useState } from "react";
import ChooseBowlModal from "./ChooseBowlModal";
import { formatTime } from "../../utils/time.js";
const MealSelectionSection = ({

  selectedPlan,
  saladSectionRef,

  mealSelections,
  salads,
  slots,

  expandedDay,
  setExpandedDay,

  handlePickSalad,

  setMealSelections,

  deriveTags,

  setPreviewImage,

  subscribed,
  startDate,


}) => {
  const [showSelector, setShowSelector] = useState(false);
  const [selectedMealIndex, setSelectedMealIndex] = useState(null);
  return (
    <>
      {/* pura meal selection */}


      {/* ============ STEP 2: SALADS (auto-expands on plan select) ============ */}
      <div ref={saladSectionRef} className={`salad-section ${selectedPlan ? "expanded" : "collapsed"}`}>
        <div className="section-head">
          <div className="section-eyebrow">Step 2</div>
          <h2 className="section-title">Choose your salads</h2>
        </div>

        {mealSelections.map((meal, index) => {
          const isExpanded = expandedDay === meal.day;
          const selectedSalad = meal.selectedSalad || salads.find((s) => s._id === meal.salad);
          const selectedSlot = slots.find(
            (s) => s._id === meal.deliverySlotId
          );
          return (
            <div className="day-card" key={`${meal.day}-${meal.date}`} style={{ animationDelay: `${index * 0.04}s` }}>
              <div className="day-card-head">
                <div className="day-title">
                  <div className="day-num">{meal.day}</div>
                  <div>
                    <h4>Meal {meal.day}</h4>

                    <div className="day-selected-name">
                      {selectedSalad
                        ? selectedSalad.name
                        : "No salad selected"}
                    </div>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#777",
                        marginTop: "4px",
                      }}
                    >
                      {selectedSlot
                        ? `${formatTime(selectedSlot.startTime)} - ${formatTime(selectedSlot.endTime)}`
                        : "No Slot"}
                    </div>

                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>

                      <input
                        type="date"
                        min={startDate}

                        value={
                          meal.date
                            ? new Date(meal.date).toLocaleDateString("en-CA")
                            : ""
                        }
                        onChange={(e) =>
                          setMealSelections((prev) => {
                            const updated = [...prev];

                            updated[index] = {
                              ...updated[index],
                              date: new Date(e.target.value),
                            };

                            return updated;
                          })
                        }
                        className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                      />

                      <select
                        value={meal.deliverySlotId}
                        onChange={(e) =>
                          setMealSelections((prev) => {
                            const updated = [...prev];

                            const slot = slots.find((s) => s._id === e.target.value);

                            console.log(
                              `Meal ${updated[index].mealNo} Slot Changed ->`,
                              slot?.shift,
                              `${slot?.startTime} - ${slot?.endTime}`
                            );

                            updated[index] = {
                              ...updated[index],
                              deliverySlotId: e.target.value,
                            };

                            return updated;
                          })
                        }
                        className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                      >
                        {slots.map((slot) => (
                          <option key={slot._id} value={slot._id}>
  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>
                </div>
              </div>


              <div className="mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                {selectedSalad ? (
                  <>
                    <div className="relative">
                      <img
                        src={selectedSalad.image}
                        alt={selectedSalad.name}
                        onClick={() => setPreviewImage(selectedSalad.image)}
                        className="h-48 w-full cursor-zoom-in object-cover"
                      />

                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow">
                        🔥 {selectedSalad.calories} kcal
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-stone-800">
                        {selectedSalad.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-stone-500">
                        {selectedSalad.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
                    <div className="rounded-full bg-white p-5 shadow">
                      🍽️
                    </div>

                    <h3 className="mt-4 text-lg font-semibold">
                      Choose Your First Bowl
                    </h3>

                    <p className="mt-2 px-8 text-center text-sm text-gray-500">
                      Select a healthy bowl to continue your meal plan.
                    </p>
                  </div>
                )}


              </div>
              <button
                className="mt-4 w-full rounded-xl bg-emerald-700 py-3 font-medium text-white hover:bg-emerald-800"
                onClick={() => {
                  setSelectedMealIndex(index);
                  setShowSelector(true);
                }}
              >
                {selectedSalad ? "Change Bowl" : "Select Bowl"}
              </button>
              <div className="mt-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Special Instructions (Optional)
  </label>

  <textarea
    rows={3}
    value={meal.note || ""}
    onChange={(e) => {
      const updated = [...mealSelections];
      updated[index] = {
        ...updated[index],
        note: e.target.value,
      };
      setMealSelections(updated);
    }}
    placeholder="e.g. No onions, less salt, spicy, cut fruits separately..."
    maxLength={250}
    className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#B5451B]"
  />

  <p className="mt-1 text-xs text-gray-500 text-right">
    {(meal.note || "").length}/250
  </p>
</div>
              {isExpanded && selectedSalad && (
                <div className="salad-detail-panel">
                  <div className="detail-grid">
                    <div
                      className="detail-image-col"
                      onClick={() => setPreviewImage(selectedSalad.image)}
                    >
                      <img src={selectedSalad.image} alt={selectedSalad.name} />
                      <div className="detail-zoom-badge">🔍</div>
                    </div>

                    <div className="detail-content-col">
                      <h5>{selectedSalad.name}</h5>
                      <p className="desc">{selectedSalad.description}</p>

                      <div className="macro-grid">
                        <div className="macro-cell"><div className="k">Calories</div><div className="v">{selectedSalad.calories}</div></div>
                        <div className="macro-cell"><div className="k">Protein</div><div className="v">{selectedSalad.protein}g</div></div>
                        <div className="macro-cell"><div className="k">Carbs</div><div className="v">{selectedSalad.carbs}g</div></div>
                        <div className="macro-cell"><div className="k">Fat</div><div className="v">{selectedSalad.fat}g</div></div>
                      </div>

                      <div className="tag-row">
                        {deriveTags(selectedSalad).map((t) => (
                          <span key={t.key} className={`diet-tag ${t.key}`}>{t.label}</span>
                        ))}
                      </div>

                      {selectedSalad.ingredients?.length > 0 && (
                        <div className="ing-row">
                          {selectedSalad.ingredients.map((item, i) => (
                            <span key={i} className="ing-chip">{item}</span>
                          ))}
                        </div>
                      )}

                      {selectedSalad.dressings?.length > 0 && (
                        <div style={{ marginTop: "12px" }}>
                          <p
                            className="desc"
                            style={{ marginBottom: "8px", fontWeight: "600" }}
                          >
                            Choose Dressing
                          </p>

                          <div className="tag-row">
                            {selectedSalad.dressings.map((dressing) => (
                              <button
                                key={dressing}
                                type="button"
                                className={`variant-pill ${meal.dressing === dressing ? "active" : ""
                                  }`}
                                onClick={() =>
                                  setMealSelections((prev) => {
                                    const updated = [...prev];

                                    updated[index] = {
                                      ...updated[index],
                                      dressing,
                                    };

                                    return updated;
                                  })
                                }
                              >
                                {dressing}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: "18px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: 600,
                            color: "#444",
                          }}
                        >
                          Special Instructions (Optional)
                        </label>

                        <textarea
                          rows={3}
                          maxLength={250}
                          value={meal.note || ""}
                          placeholder="e.g. No onions, less salt, dressing on the side..."
                          onChange={(e) =>
                            setMealSelections((prev) => {
                              const updated = [...prev];

                              updated[index] = {
                                ...updated[index],
                                note: e.target.value,
                              };

                              return updated;
                            })
                          }
                          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                        />

                        <div
                          style={{
                            textAlign: "right",
                            fontSize: "12px",
                            color: "#888",
                            marginTop: "4px",
                          }}
                        >
                          {(meal.note || "").length}/250
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ChooseBowlModal
        open={showSelector}
        salads={salads}
        onClose={() => setShowSelector(false)}
        onSelect={(salad) => {
          handlePickSalad(selectedMealIndex, salad);
          setShowSelector(false);
        }}
      />

    </>
  );
}


export default MealSelectionSection;





