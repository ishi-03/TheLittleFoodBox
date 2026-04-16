import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" && <Navbar />}
      <Outlet />
    </>
  );
}