import Nav from "../components/Nav";

export default function MealsOnWheels() {
  return (
    <>
      <Nav />

      <main className="min-h-screen bg-[#FFFDF9]">
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-[#B5451B] mb-4">
            Fresh • Healthy • Homemade
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#2A1A0E] mb-6">
            Meals on Wheels
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 leading-8">
            Enjoy freshly prepared homemade meals delivered to your doorstep.
            Crafted with premium ingredients, balanced nutrition, and authentic
            flavours for your everyday lifestyle.
          </p>
        </section>
      </main>

    </>
  );
}