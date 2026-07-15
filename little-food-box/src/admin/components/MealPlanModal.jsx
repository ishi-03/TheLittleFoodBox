export default function MealPlanModal({
  open,
  onClose,
  subscription,
}) {
  if (!open || !subscription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-[#FDFBF7] shadow-xl border border-stone-200/60">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-stone-200 p-6">

          <div>

            <h2 className="text-2xl font-semibold text-stone-800">
              Meal Plan
            </h2>

            <p className="text-stone-500 mt-0.5">
              {subscription.userId?.name}
            </p>

          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors text-xl"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto p-6">

          {subscription.mealSelections?.length === 0 && (
            <div className="text-center text-stone-500 py-8">
              No Meal Plan Selected
            </div>
          )}

          {subscription.mealSelections?.map((meal) => (

            <div
              key={meal.day}
              className="mb-4 rounded-xl border border-stone-200 bg-white p-5 last:mb-0"
            >

              <div className="mb-3 flex items-center justify-between">

                <h3 className="text-lg font-semibold text-stone-800">
                  Day {meal.day}
                </h3>

              </div>

              {meal.salad ? (

                <>

                  <h4 className="text-xl font-semibold text-stone-800">
                    🥗 {meal.salad.name}
                  </h4>

                  <p className="mt-2 text-stone-600">
                    {meal.salad.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <div className="rounded-lg bg-stone-50 px-3 py-2">
                      <strong className="block text-xs font-medium uppercase tracking-wide text-stone-500">
                        Calories
                      </strong>

                      <p className="text-stone-800 font-medium">
                        {meal.salad.calories}
                      </p>
                    </div>

                    <div className="rounded-lg bg-stone-50 px-3 py-2">
                      <strong className="block text-xs font-medium uppercase tracking-wide text-stone-500">
                        Protein
                      </strong>

                      <p className="text-stone-800 font-medium">
                        {meal.salad.protein} g
                      </p>
                    </div>

                    <div className="rounded-lg bg-stone-50 px-3 py-2">
                      <strong className="block text-xs font-medium uppercase tracking-wide text-stone-500">
                        Carbs
                      </strong>

                      <p className="text-stone-800 font-medium">
                        {meal.salad.carbs} g
                      </p>
                    </div>

                    <div className="rounded-lg bg-stone-50 px-3 py-2">
                      <strong className="block text-xs font-medium uppercase tracking-wide text-stone-500">
                        Fat
                      </strong>

                      <p className="text-stone-800 font-medium">
                        {meal.salad.fat} g
                      </p>
                    </div>

                  </div>

                  <div className="mt-4">

                    <strong className="text-xs font-medium uppercase tracking-wide text-stone-500">
                      Ingredients
                    </strong>

                    <div className="mt-2 flex flex-wrap gap-2">

                      {meal.salad.ingredients?.map(
                        (item, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 border border-emerald-100"
                          >
                            {item}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                  <div className="mt-4">

                    <strong className="text-xs font-medium uppercase tracking-wide text-stone-500">
                      Dressings
                    </strong>

                    <div className="mt-2 flex flex-wrap gap-2">

                      {meal.salad.dressings?.map(
                        (item, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700 border border-amber-100"
                          >
                            {item}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                  <div className="mt-5 flex gap-3">

                    {meal.salad.variants?.vegan && (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100 text-sm font-medium">
                        🌱 Vegan
                      </span>
                    )}

                    {meal.salad.variants?.jain && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700 border border-amber-100 text-sm font-medium">
                        🪔 Jain
                      </span>
                    )}

                  </div>

                </>

              ) : (

                <div className="text-red-500 text-sm">
                  No salad selected.
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}