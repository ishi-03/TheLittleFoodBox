import { useState, useEffect, useRef } from "react";
import { X, Upload, ImageIcon, Loader2 } from "lucide-react";

const DEFAULT_CATEGORIES = [
  "Indian",
  "Italian",
  "Chinese",
  "Mexican",
  "Salads",
  "Desserts",
  "Beverages",
];

const DEFAULT_SECTIONS = [
  "Starters",
  "Street & Chaat",
  "Main Course",
  "Rice",
  "Bread",
  "Desserts",
  "Drinks",
];

const EMPTY_FORM = {
  name: "",
  price: "",
  unit: "",
  serves: "",
  minOrder: "",
  category: "",
  section: "",
  chefPick: false,
  popular: false,
  spicy: false,
  isAvailable: true,
};

/**
 * MenuItemModal
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - onSave: (payload: FormData | object, id?: string) => Promise<void>  // throws on failure
 * - initialData: existing menu item when editing, null when adding
 */
export default function MenuItemModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const fileInputRef = useRef(null);

  const isEditMode = Boolean(initialData?._id);

  // Populate form when opening in edit mode, reset when opening in add mode
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        price: initialData.price ?? "",
        unit: initialData.unit ?? "",
        serves: initialData.serves ?? "",
        minOrder: initialData.minOrder ?? "",
        category: initialData.category ?? "",
        section: initialData.section ?? "",
        chefPick: Boolean(initialData.chefPick),
        popular: Boolean(initialData.popular),
        spicy: Boolean(initialData.spicy),
        isAvailable: initialData.isAvailable ?? true,
      });
      setImagePreview(initialData.image || null);
    } else {
      setForm(EMPTY_FORM);
      setImagePreview(null);
    }

    setImageFile(null);
    setErrors({});
    setSaveError("");
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please select a valid image file" }));
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Dish name is required";
    if (form.price === "" || form.price === null) {
      nextErrors.price = "Price is required";
    } else if (Number(form.price) <= 0) {
      nextErrors.price = "Price must be greater than 0";
    }
    if (!form.category.trim()) nextErrors.category = "Category is required";
    if (!form.section.trim()) nextErrors.section = "Section is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = () => {
    const fields = {
      name: form.name.trim(),
        price: form.price.trim(),
      unit: form.unit.trim(),
      serves: form.serves.trim(),
      minOrder: form.minOrder.trim(),
      category: form.category.trim(),
      section: form.section.trim(),
      chefPick: form.chefPick,
      popular: form.popular,
      spicy: form.spicy,
      isAvailable: form.isAvailable,
    };

    // Image is optional. Use FormData only when a new file was picked,
    // otherwise send plain JSON so the backend doesn't need to parse multipart.
    if (imageFile) {
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("image", imageFile);
      return formData;
    }

    return fields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    if (!validate()) return;

    setIsSaving(true);
    try {
      const payload = buildPayload();
      await onSave(payload, initialData?._id);
      onClose();
    } catch (err) {
      setSaveError(err?.message || "Something went wrong while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FBF9F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 sticky top-0 bg-[#FBF9F4] rounded-t-2xl">
          <h2 className="text-xl font-semibold text-stone-800">
            {isEditMode ? "Edit Dish" : "Add Dish"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:bg-stone-200/70 hover:text-stone-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {saveError && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {saveError}
            </div>
          )}

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Dish Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={28} className="text-stone-400" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Upload size={16} />
                  {imagePreview ? "Change image" : "Upload image"}
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-sm text-red-600 hover:text-red-700 text-left"
                  >
                    Remove image
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            </div>
            {errors.image && (
              <p className="mt-1 text-xs text-red-600">{errors.image}</p>
            )}
          </div>

          {/* Name + Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Dish Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Paneer Tikka"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                  errors.name ? "border-red-400" : "border-stone-300"
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="e.g. 249"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                  errors.price ? "border-red-400" : "border-stone-300"
                }`}
              />
              {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
            </div>
          </div>

          {/* Unit + Serves */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Unit</label>
              <input
                type="text"
                value={form.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                placeholder="e.g. per plate, per kg"
                className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Serves</label>
              <input
                type="text"
                value={form.serves}
                onChange={(e) => handleChange("serves", e.target.value)}
                placeholder="e.g. 2-3 people"
                className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors"
              />
            </div>
          </div>

          {/* Minimum Order */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Minimum Order
            </label>
            <input
              type="text"
              value={form.minOrder}
              onChange={(e) => handleChange("minOrder", e.target.value)}
              placeholder="e.g. 10 plates"
              className="w-full sm:w-1/2 rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Category + Section (with custom entry) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                list="category-options"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Select or type a category"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                  errors.category ? "border-red-400" : "border-stone-300"
                }`}
              />
              <datalist id="category-options">
                {DEFAULT_CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.category && (
                <p className="mt-1 text-xs text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Section <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                list="section-options"
                value={form.section}
                onChange={(e) => handleChange("section", e.target.value)}
                placeholder="Select or type a section"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                  errors.section ? "border-red-400" : "border-stone-300"
                }`}
              />
              <datalist id="section-options">
                {DEFAULT_SECTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
              {errors.section && (
                <p className="mt-1 text-xs text-red-600">{errors.section}</p>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Tags</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <CheckboxTile
                label="Mum's Fave"
                checked={form.chefPick}
                onChange={(v) => handleChange("chefPick", v)}
              />
              <CheckboxTile
                label="Fan Favourite"
                checked={form.popular}
                onChange={(v) => handleChange("popular", v)}
              />
              <CheckboxTile
                label="Spicy"
                checked={form.spicy}
                onChange={(v) => handleChange("spicy", v)}
              />
              <CheckboxTile
                label="Available"
                checked={form.isAvailable}
                onChange={(v) => handleChange("isAvailable", v)}
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-200 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-stone-700 border border-stone-300 hover:bg-stone-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CheckboxTile({ label, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors select-none ${
        checked
          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
          : "border-stone-300 bg-white text-stone-600 hover:bg-stone-50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded accent-emerald-700"
      />
      {label}
    </label>
  );
}