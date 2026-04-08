export default function Footer() {
  return (
    <>
      <div className="relative bottom-0 left-0 right-0">
        
        <div className="relative w-full">
          <svg
            width="100%"
            height="100"
            viewBox="0 0 1400 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="
                M 0 100
                L 0 0
                L 450 0
                Q 480 0 490 10
                Q 500 20 510 30
                L 530 50
                Q 545 65 570 65
                L 830 65
                Q 855 65 870 50
                L 890 30
                Q 900 20 910 10
                Q 920 0 950 0
                L 1400 0
                L 1400 100
                Z
              "
              fill="rgba(255,255,255,0.25)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="3"
            />
          </svg>

          <div className="absolute bottom-0 left-0 right-0 h-[100px] flex items-start justify-between px-12 pt-4">
            <div className="flex gap-6 text-white text-lg font-medium">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">FAQ</a>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-8">
              <div className="text-white text-sm font-medium px-6 py-2 bg-white/20 rounded-xl border-2 border-white/40">
The LITTLE Food Box              </div>
            </div>

            <div className="flex gap-6 text-white text-lg font-medium">
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
