import { Link } from "react-router-dom";

const ExploreButton = ({ className, bgColor = "#F08787" }) => (
  <Link to="/menucard">
    <button
      className={className}
      style={{ backgroundColor: bgColor }}
    >
      Explore Menu
    </button>
  </Link>
);

export default function MenuText({ type }) {
  if (type === "pink") {
    return (
      <div className="absolute inset-0 flex items-start pt-10 sm:pt-16 overflow-y-auto">
        <div className="px-6 sm:px-12 lg:px-20 max-w-[90%] text-[#fcefe9]">

          <p className="italic text-[#F08787] text-base sm:text-xl"
            style={{ fontFamily: "Great Vibes, cursive" }}>
            Finest & New
          </p>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}>
            Cream Cheese <br /> & Dips
          </h1>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
            Explore the collection with extra charm...
          </p>

          <ExploreButton className="mt-4 sm:mt-6 px-6 py-2 rounded-xl w-full sm:w-[40%]" />
        </div>
      </div>
    );
  }

  if (type === "cyan") {
    return (
      <div className="absolute ml-5 inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 text-white">

        <p className="ml-5 italic text-lg sm:text-xl"
          style={{ fontFamily: "Great Vibes, cursive" }}>
          Finest & New
        </p>

        <h1 className="text-2xl ml-5 sm:text-3xl lg:text-4xl font-bold"
          style={{ fontFamily: "Playfair Display, serif" }}>
          Chaat Corner
        </h1>

        <p className="mt-3 ml-5 text-sm sm:text-base lg:text-lg">
          Explore the collection with extra charm. Bringing a fusion
          of soft visuals and playful elements that make your menu
          pages truly irresistible and stylish.
        </p>

        <ExploreButton
          className="mt-6 px-6 py-2 rounded-lg w-full sm:w-[60%]"
          bgColor="#6DAFB4"
        />
      </div>
    );
  }

  if (type === "yellow") {
    return (
      <div className="absolute inset-0 flex items-center">
        <div className="px-8 sm:px-12 lg:px-20 max-w-[85%] text-[#fcefe9]">

          <p className="italic text-[#F08787] text-lg sm:text-xl"
            style={{ fontFamily: "Great Vibes, cursive" }}>
            Finest & New
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}>
            Cream Cheese <br /> & Dips
          </h1>

          <p className="mt-3 text-sm sm:text-base lg:text-lg">
            Explore the collection with extra charm...
          </p>

          <ExploreButton className="mt-6 px-6 py-2 rounded-xl w-full sm:w-[40%]" />
        </div>
      </div>
    );
  }

  if (type === "sage") {
    return (
      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 text-white">

        <p className="ml-5 italic text-lg sm:text-xl"
          style={{ fontFamily: "Great Vibes, cursive" }}>
          Finest & New
        </p>

        <h1 className="text-2xl ml-5 sm:text-3xl lg:text-4xl font-bold"
          style={{ fontFamily: "Playfair Display, serif" }}>
          Chaat Corner
        </h1>

        <p className="mt-3 ml-5 text-sm sm:text-base lg:text-lg">
          Explore the collection with extra charm. Bringing a fusion
          of soft visuals and playful elements that make your menu
          pages truly irresistible and stylish.
        </p>

        <ExploreButton className="mt-3 sm:mt-5 px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg w-fit" />
      </div>
    );
  }

  return null;
}