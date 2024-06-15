import { Outlet, ScrollRestoration } from "react-router-dom";

export default function AuthWrapper() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
