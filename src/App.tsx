import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSpring, animated } from "react-spring";
import Preloader from "./pages/Prelaoder";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import FoodPlace from "./pages/FoodPlace";
import CheckOrders from "./pages/CheckOrders";
import Home from "./pages/Homepage";
import RedBrickArea from "./pages/RedBrickArea";
import BlockHCafe from "./pages/BlockHCafe";
import Checkout from "./pages/Checkout";
import { ItemType } from "./types";
import ShoppingCart from "../src/Components/ShoppingCart";
import FoodTruckMenu from "./pages/FoodTruckMenu";
import supabase from "./utils/supabase";
import { Session } from "@supabase/supabase-js";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<
    { item: ItemType; quantity: number }[]
  >([]);
  const [session, setSession] = useState<Session | null>(null);
  const fadeInProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    getSession();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const hideCartOnRoutes = [
    "/login",
    "/",
    "/forgot-password",
    "/checkout",
    "/check-orders",
    "/signup",
    "/login",
  ];
  return (
    <div>
      {loading &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" ? (
        <Preloader />
      ) : (
        <Router>
          {!hideCartOnRoutes.includes(location.pathname) && (
            <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
          )}
          <animated.div id="content" className="block" style={fadeInProps}>
            <Routes>
              {session ? (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/check-orders" element={<CheckOrders />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/foodplace"
                    element={
                      <FoodPlace
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                      />
                    }
                  />
                  <Route
                    path="/red-brick-area"
                    element={
                      <RedBrickArea
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                      />
                    }
                  />
                  <Route
                    path="/red-brick-area/:food_truck"
                    element={
                      <FoodTruckMenu
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                      />
                    }
                  />
                  <Route path="/block-h-cafe" element={<BlockHCafe />} />
                  {/* <Route path="/student-lounge" element={<StudentLounge  />} /> */}
                  {/* <Route path="/student-lounge/:stall" element={<StallMenu loungeItems={loungeItems} cartItems={cartItems} setCartItems={setCartItems} />} /> */}
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </animated.div>
        </Router>
      )}
    </div>
  );
};

export default App;
