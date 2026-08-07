const WHATSAPP_NUMBER = "919998722140";

const platters = [
  {
    id: "dips-cheese",
    name: "Dips & Cheese Customised Platter",
    price: 3000,
    description:
      "Choice of 2 dips + 2 cream cheese balls with accompaniments, or 4 dips OR 4 cream cheese balls with accompaniments.",
    tags: ["Dips", "Cream Cheese Balls", "Customizable", "Accompaniments"],
    image:
      "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    popular: true,
  },
  {
    id: "mexican",
    name: "Mexican Platter",
    price: 3200,
    description:
      "Nachos, tacos, refried beans, guacamole, salsa, quesadillas and a lot more.",
    tags: ["Nachos", "Tacos", "Guacamole", "Salsa", "Quesadillas"],
    image:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bao",
    name: "Bao Platter",
    price: 3200,

    description:
      "Bao bread, garlic mushroom, spicy paneer, pan fried veggies, sauces and a lot more.",
    tags: ["Bao Bread", "Garlic Mushroom", "Spicy Paneer", "Pan Fried Veggies"],
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mediterranean",
    name: "Mediterranean Platter",
    price: 3200,
    description:
      "Hummus, pita, lavash, muhammara, baba ganoush and a lot more.",
    tags: ["Hummus", "Pita", "Lavash", "Muhammara", "Baba Ganoush"],
    image:
      "https://images.unsplash.com/photo-1544510808-15a4f68c2a2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tea-time",
    name: "Tea Time Platter",
    price: 3000,
    description:
      "Vada pav, dabeli, vol-au-vent, pita pocket, focaccia bread sandwich.",
    tags: ["Vada Pav", "Dabeli", "Vol-au-vent", "Focaccia Sandwich"],
    image:
      "https://images.unsplash.com/photo-1606491956391-89b1ee5e2f79?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "burger",
    name: "Burger Platter",
    price: 2500,
    description: "Burger buns, different fillings, sauces and a lot more.",
    tags: ["Burger Buns", "Fillings", "Sauces"],
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hummus",
    name: "Hummus Platter",
    price: 1800,
    description:
      "Classic hummus, varieties of lavash, pita bread, falafel bullets, fresh vegetables.",
    tags: ["Classic Hummus", "Lavash", "Pita Bread", "Falafel"],
    image:
      "https://images.unsplash.com/photo-1571745544682-826b45ca7a19?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "guacamole",
    name: "Guacamole Platter",
    price: 1800,
    description: "Guacamole, nacho chips, salsa, sour cream.",
    tags: ["Guacamole", "Nacho Chips", "Salsa", "Sour Cream"],
    image:
      "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bombay",
    name: "Bombay Platter",
    price: 2500,
    description:
      "Bhaji along with masala pav, butter pav, Mumbai tawa pulav and a lot more.",
    tags: ["Bhaji", "Masala Pav", "Butter Pav", "Tawa Pulav"],
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "indian",
    name: "Indian Platter",
    price: 3500,
    description:
      "Black dal makhani, paneer tikka, butter naan, biryani and a lot more.",
    tags: ["Dal Makhani", "Paneer Tikka", "Butter Naan", "Biryani"],
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    popular: true,
  },
  {
    id: "litti-chokha",
    name: "Litti Chokha Platter",
    price: 2000,
    description:
      "Whole wheat dough balls stuffed with sattu, 3 types of chokha and a lot more.",
    tags: ["Stuffed Litti", "3 Types of Chokha", "Accompaniments"],
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "chinese",
    name: "Chinese Platter",
    price: 3500,
    description:
      "Kung pao potato/paneer, paneer chilli, vegetable spring roll, vegetables in black bean, chilli garlic & schezwan sauces, fried rice, manchurian, noodles.",
    tags: ["Kung Pao", "Paneer Chilli", "Spring Roll", "Fried Rice", "Noodles"],
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "italian",
    name: "Italian Platter",
    price: 3500,
    description:
      "Assorted canapes, crostini, herbed baby potatoes, stuffed mushrooms, choice of pasta in aglio e olio, alfredo, arrabbiata, pesto or parmarosa.",
    tags: ["Canapes", "Crostini", "Stuffed Mushrooms", "Choice of Pasta"],
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
    popular: true,
  },
];

function handleCustomize(platter) {
  const message = `Hi! 👋
I'm interested in customizing the *${platter.name}*.

Here are my requirements:
📅 Event Date:
👥 Number of Guests:
📍 Event Location:
🍽️ Occasion:
🥗 Dietary Preferences (Jain/Vegan/No Onion Garlic/etc.):
✨ Customizations Required:
📝 Additional Notes:

Please let me know the available options and pricing.
Thank you! 😊`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

function PlatterCard({ platter, onCustomize }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#E7DFD2] shadow-[0_1px_3px_rgba(42,26,14,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(42,26,14,0.12)]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={platter.image}
          alt={platter.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A0E]/50 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute bottom-3 right-3 rounded-full bg-[#FFFDF9] px-3.5 py-1.5 shadow-md">
          <span
            className="text-[13px] font-semibold tracking-wide text-[#B5451B]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            ₹{platter.price.toLocaleString("en-IN")}/-
          </span>
        </div>

        {/* Most Popular badge */}
        {platter.popular && (
          <div className="absolute left-3 top-3 rounded-full bg-[#B5451B] px-3 py-1 shadow-md">
            <span
              className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#FFFDF9]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Most Popular
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
        <h3
          className="text-[19px] leading-snug text-[#2A1A0E]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
        >
          {platter.name}
        </h3>

        <p
          className="text-[13.5px] leading-relaxed text-[#6B5A4A]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          {platter.description}
        </p>

        {/* Tags */}
        <div className="mt-1 flex flex-wrap gap-1.5">
          {platter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#E7DFD2] bg-[#FFFDF9] px-2.5 py-1 text-[11px] text-[#8A6F52]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Customize button */}
        <button
          onClick={() => onCustomize(platter)}
          className="mt-3 w-full rounded-full border border-[#B5451B] bg-transparent py-2.5 text-[13px] font-medium uppercase tracking-[0.08em] text-[#B5451B] transition-all duration-300 hover:bg-[#B5451B] hover:text-[#FFFDF9]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Customize
        </button>
      </div>
    </div>
  );
}

export default function Platters() {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* Hero */}
      <div className="px-6 pt-24 pb-14 text-center md:pt-32 md:pb-16">
        <p
          className="mb-3 text-[12px] font-medium uppercase tracking-[0.25em] text-[#B5451B]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          The Little Food Box
        </p>
        <h1
          className="text-[42px] leading-tight text-[#2A1A0E] md:text-[56px]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
        >
          Featured Platters
        </h1>
        <p
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#6B5A4A]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Curated spreads for every occasion, crafted with care and served
          with a little bit of theatre.
        </p>
      </div>

      {/* Customization note */}
      <div className="mx-auto mb-14 max-w-3xl px-6">
        <div className="rounded-2xl border border-[#E7DFD2] bg-[#FBF6EC] px-6 py-5 text-center">
          <p
            className="text-[14px] leading-relaxed text-[#5A4632]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            <span className="text-[#B5451B]">✨</span> Every platter can be
            customized to suit your preferences. We also cater for birthdays,
            corporate events, family gatherings, parties, and special
            occasions.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {platters.map((platter) => (
            <PlatterCard
              key={platter.id}
              platter={platter}
              onCustomize={handleCustomize}
            />
          ))}
        </div>
      </div>
    </div>
  );
}