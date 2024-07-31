import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        {/*  we want the main content changes based on current route */}
        {/* Outlet is like a placeholdre taht allows browser to render child routes inside its parent route  */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
