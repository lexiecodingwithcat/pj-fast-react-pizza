import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  // we want to have a huge Loader so that when one page of the whole app is loading
  // we show the loader
  const navigation = useNavigation();
  
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
  
      <Header />
      <main>
        {/*  we want the main content changes based on current route */}
        {/* Outlet is like a placeholdre taht allows browser to render child routes inside its parent route  */}
        {isLoading ? <Loader /> : <Outlet />}
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
