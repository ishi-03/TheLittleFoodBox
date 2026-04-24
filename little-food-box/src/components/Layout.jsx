import Nav from "./Nav";   // top navbar
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}