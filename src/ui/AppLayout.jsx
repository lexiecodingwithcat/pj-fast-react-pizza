import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import {
  Outlet,
  useNavigation,
} from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  // we want to have a huge Loader so that when one page of the whole app is loading
  // we show the loader
  const navigation = useNavigation();

  const isLoading =
    navigation.state === "loading";

  return (
    // auto means it will take the space based on its content
    //h-screen will be the 100vh of the viewpoint
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="overflow-scroll">
        {/*  we can use margin left and right set to auto to place it in the middle */}
        <main className="mx-auto max-w-3xl">
          {/*  we want the main content changes based on current route */}
          {/* Outlet is like a placeholdre taht allows browser to render child routes inside its parent route  */}
          {isLoading ? <Loader /> : <Outlet />}
          {/* {true && <Loader />} */}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
