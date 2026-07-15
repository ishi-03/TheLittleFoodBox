import { useEffect, useState } from "react";

export default function SaladModal({
  open,
  onClose,
  onSave,
  editingSalad,
}) {
  const emptyForm = {
    name: "",
    description: "",
    image: "",
    category: "",

    calories: "",
    protein: "",
    carbs: "",
    fat: "",

    ingredients: [],
    dressings: [],

   variants: {
  regular: true,
  vegan: false,
  jain: false,
},

    active: true,
    sortOrder: 0,
  };

  const [form, setForm] = useState(emptyForm);

  const [ingredient, setIngredient] = useState("");
  const [dressing, setDressing] = useState("");

  useEffect(() => {
    if (editingSalad) {
     setForm({
  ...emptyForm,
  ...editingSalad,
  ingredients: editingSalad.ingredients || [],
  dressings: editingSalad.dressings || [],
  variants: editingSalad.variants || {
    regular: true,
    vegan: false,
    jain: false,
  },
});
    } else {
      setForm(emptyForm);
    }

    setIngredient("");
    setDressing("");
  }, [editingSalad, open]);

  if (!open) return null;

  const addIngredient = () => {
    if (!ingredient.trim()) return;

    setForm({
      ...form,
      ingredients: [...form.ingredients, ingredient.trim()],
    });

    setIngredient("");
  };

  const removeIngredient = (index) => {
    setForm({
      ...form,
      ingredients: form.ingredients.filter((_, i) => i !== index),
    });
  };

  const addDressing = () => {
    if (!dressing.trim()) return;

    setForm({
      ...form,
      dressings: [...form.dressings, dressing.trim()],
    });

    setDressing("");
  };

  const removeDressing = (index) => {
    setForm({
      ...form,
      dressings: form.dressings.filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("Please enter salad name");
      return;
    }

    onSave({
      ...form,
      calories: Number(form.calories),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
      sortOrder: Number(form.sortOrder),
    });
  };

  const inputClass =
    "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-colors focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-stone-500";

  // ↓↓↓ ISKE BAAD TUMHARA return(...) START HOGA ↓↓↓


return (
  <div className="fixed inset-0 z-[9999] bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FDFBF7] shadow-xl border border-stone-200/60">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">

        <div>
          <h2 className="text-2xl font-semibold text-stone-800">
            {editingSalad ? "Edit Salad" : "Add Salad"}
          </h2>

          <p className="text-sm text-stone-500 mt-1">
            Fill all salad information below.
          </p>
        </div>

        <button
          onClick={onClose}
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 text-xl transition-colors"
        >
          ✕
        </button>

      </div>

      {/* Body */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">

        {/* Name */}

        <div>

          <label className={labelClass}>
            Salad Name
          </label>

          <input
            className={inputClass}
            placeholder="Enter salad name"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value,
              })
            }
          />

        </div>

        {/* Category */}

        <div>

          <label className={labelClass}>
            Category
          </label>

          <input
            className={inputClass}
            placeholder="Green Salad / Fruit Bowl"
            value={form.category}
            onChange={(e)=>
              setForm({
                ...form,
                category:e.target.value,
              })
            }
          />

        </div>

        {/* Image */}

        <div className="md:col-span-2">

        <label className={labelClass}>
  Salad Image
</label>

<input
  type="file"
  accept="image/*"
  className={inputClass}
  onChange={(e) =>
    setForm({
      ...form,
      image: e.target.files[0],
    })
  }
/>
{form.image && (
  <img
    src={
      typeof form.image === "string"
        ? form.image
        : URL.createObjectURL(form.image)
    }
    className="mt-4 h-40 rounded-xl object-cover"
    alt=""
  />
)}
        

        </div>

        {/* Description */}

        <div className="md:col-span-2">

          <label className={labelClass}>
            Description
          </label>

          <textarea
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Write salad description..."
            value={form.description}
            onChange={(e)=>
              setForm({
                ...form,
                description:e.target.value,
              })
            }
          />

        </div>

        {/* Nutrition */}

        <div>

          <label className={labelClass}>
            Calories
          </label>

          <input
            type="number"
            className={inputClass}
            value={form.calories}
            onChange={(e)=>
              setForm({
                ...form,
                calories:e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className={labelClass}>
            Protein (g)
          </label>

          <input
            type="number"
            className={inputClass}
            value={form.protein}
            onChange={(e)=>
              setForm({
                ...form,
                protein:e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className={labelClass}>
            Carbs (g)
          </label>

          <input
            type="number"
            className={inputClass}
            value={form.carbs}
            onChange={(e)=>
              setForm({
                ...form,
                carbs:e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className={labelClass}>
            Fat (g)
          </label>

          <input
            type="number"
            className={inputClass}
            value={form.fat}
            onChange={(e)=>
              setForm({
                ...form,
                fat:e.target.value,
              })
            }
          />

        </div>
                {/* Ingredients */}

        <div className="md:col-span-2">
          <label className={labelClass}>Ingredients</label>

          <div className="flex gap-2">
            <input
              className={inputClass}
              placeholder="Add ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />

            <button
              type="button"
              onClick={addIngredient}
              className="rounded-lg bg-emerald-800 px-5 text-sm font-medium text-white hover:bg-emerald-900 transition-colors"
            >
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {form.ingredients.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-sm text-emerald-700"
              >
                {item}

                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="font-bold text-emerald-500 hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dressings */}

        <div className="md:col-span-2">
          <label className={labelClass}>Dressings</label>

          <div className="flex gap-2">
            <input
              className={inputClass}
              placeholder="Add dressing"
              value={dressing}
              onChange={(e) => setDressing(e.target.value)}
            />

            <button
              type="button"
              onClick={addDressing}
              className="rounded-lg bg-emerald-800 px-5 text-sm font-medium text-white hover:bg-emerald-900 transition-colors"
            >
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {form.dressings.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-sm text-amber-700"
              >
                {item}

                <button
                  type="button"
                  onClick={() => removeDressing(index)}
                  className="font-bold text-amber-500 hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}

        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-stone-700">
            Salad Options
          </h4>

          <div className="space-y-3">

            <label className="flex items-center gap-3 text-sm text-stone-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700/30"
              checked={form.variants?.vegan}

onChange={(e) =>
  setForm({
    ...form,
    variants: {
      ...form.variants,
      vegan: e.target.checked,
    },
  })
}
              />
              Vegan Available
            </label>

            <label className="flex items-center gap-3 text-sm text-stone-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700/30"
                checked={form.variants?.jain}

onChange={(e) =>
  setForm({
    ...form,
    variants: {
      ...form.variants,
      jain: e.target.checked,
    },
  })
}
              />
              Jain Available
            </label>

            <label className="flex items-center gap-3 text-sm text-stone-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700/30"
                checked={form.active}
                onChange={(e) =>
                  setForm({
                    ...form,
                    active: e.target.checked,
                  })
                }
              />
              Active
            </label>

          </div>
        </div>

        {/* Sort Order */}

        <div className="rounded-xl border border-stone-200 bg-white p-4">

          <label className={labelClass}>
            Sort Order
          </label>

          <input
            type="number"
            className={inputClass}
            value={form.sortOrder}
            onChange={(e) =>
              setForm({
                ...form,
                sortOrder: e.target.value,
              })
            }
          />

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 border-t border-stone-200 px-6 py-5">

        <button
          onClick={onClose}
          className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="rounded-lg bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 transition-colors"
        >
          {editingSalad ? "Update Salad" : "Save Salad"}
        </button>

      </div>

    </div>
  </div>
)
}