import FeatureSection from "../components/FeatureSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 

export default function Home() {
  return (
<div className="relative w-full min-h-screen">
      
      {/* BACKGROUND WRAPPER */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/foodly-bg1.png')" }}
      />

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
<div className="pt-[280px]">
        <FeatureSection
          title="Fresh Food Delivered"
          desc="Delicious meals prepared with clean ingredients and served fresh."
          img="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=800&q=80"
          reverse={false}
        />

        <FeatureSection
          title="Healthy & Tasty"
          desc="Balanced nutrition with premium quality and taste."
          img="https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&w=800&q=80"
          reverse={true}
        />

        <FeatureSection
          title="Premium Ingredients"
          desc="We use only hand-picked fresh veggies and ingredients."
          img="https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&w=800&q=80"
          reverse={false}
        />
      </div>

      {/* FOOTER AT REAL BOTTOM */}
      <Footer />
    </div>
  );
}

