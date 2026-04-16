import MenuText from "./MenuText";
// import Nav from "../components/Nav";
export default function Menu() {
  return (
    <div className="relative w-full min-h-screen bg-[#f5e9d9] overflow-hidden">
      {/* <Nav /> */}

      {/* PARTICLE BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none 
        bg-[radial-gradient(#e3c4a8_2px,transparent_2px)] 
        [background-size:120px_120px]">
      </div>

      {/* FLEX WRAPPER */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 
  gap-6 px-4 lg:px-8 py-12 w-full">


        {/* FIRST PAPER (Bigger) */}
        <div className="relative w-full lg:col-span-2 overflow-hidden">
          <img
            src="/TornImages/DustyPink.png"
            className="w-full h-auto"
            alt="Cream Cheese Paper"
          />

          <img
            src="/TornImages/cheeseball.png"
            className="absolute top-10 right-10 w-24 sm:w-32 lg:w-48"
            alt="Cheese Ball"
          />

          <img
            src="/TornImages/cheesespoon.png"
            className="absolute -top-6 -left-6 w-20 sm:w-28 lg:w-40 rotate-[250deg]"
            alt="Cheese Spoon"
          />

          <MenuText type="pink" />
        </div>

        {/* SECOND PAPER */}
        <div className="relative w-full lg:col-span-1 overflow-hidden lg:mt-12">
          <img
            src="/TornImages/cyan.png"
            className="w-full h-[auto]"
            alt="Chaat Paper"
          />

          <img
            src="/TornImages/chaat.png"
            className="absolute bottom-6 right-6 w-20 sm:w-28 lg:w-40"
            alt="Chaat"
          />

          <MenuText type="cyan" />
        </div>

        {/* third paper */}

        <div className="relative w-full lg:col-span-2 overflow-hidden lg:-mt-42">
          <img
            src="/TornImages/yellow.png"
            className="w-full h-auto"
            alt="Cream Cheese Paper"
          />
          <MenuText type="yellow" />
        </div>
{/* FOURTH PAPER (Right Vertical) */}
<div className="relative w-full lg:col-span-1 overflow-hidden 
  md:-mt-32 lg:-mt-4 max-h-[500px]">

  <img
    src="/TornImages/sage.png"
    className="w-full h-auto object-contain"
    alt="Sage Paper"
  />

  <MenuText type="sage" />
</div>
      </div>
    </div>
  );
}
