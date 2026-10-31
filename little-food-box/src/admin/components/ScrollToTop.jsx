import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    // Back/forward (POP) pe browser ka native scroll restoration chalne do
    if (navType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
}