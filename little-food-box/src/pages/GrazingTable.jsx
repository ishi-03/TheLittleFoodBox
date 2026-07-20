import Nav from "../components/Nav";

export default function GrazingTables() {
  return (
    <>
      <Nav />

      <main className="min-h-screen bg-[#FFFDF9]">
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-[#B5451B] mb-4">
            Curated • Elegant • Memorable
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#2A1A0E] mb-6">
            Grazing Tables
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 leading-8">
            Beautifully curated grazing tables for intimate gatherings,
            birthdays, corporate events, weddings and celebrations. Every table
            is thoughtfully designed to create a memorable dining experience.
          </p>
        </section>
      </main>

    </>
  );
}