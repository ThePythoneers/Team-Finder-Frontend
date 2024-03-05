import { Navbar } from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export function OrganizationPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
