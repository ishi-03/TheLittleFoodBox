import Nav from "./Nav";   // top navbar
import { Outlet } from "react-router-dom";
import Footer from "./Footer"; // bottom footer
export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}