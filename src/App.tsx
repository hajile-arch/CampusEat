import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSpring, animated } from "react-spring"; // Import animated for applying animation
import Preloader from "./pages/Prelaoder";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import FoodPlace from "./pages/FoodPlace";
import CheckOrders from "./pages/CheckOrders";
import Home from "./pages/Homepage";
import RedBrickArea from "./pages/RedBrickArea";
import BlockHCafe from "./pages/BlockHCafe";
// import StudentLounge from "./pages/StudentLounge";
import Haha from "./pages/haha";
import Checkout from "./pages/Checkout";
import { ItemType } from "./types";
import ShoppingCart from "../src/Components/ShoppingCart"; // Import your ShoppingCart component
import FoodTruckMenu from "./pages/FoodTruckMenu";
// import StallMenu from "./pages/StallMenu";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true); // State to control preloader visibility
  const [cartItems, setCartItems] = useState<
    { item: ItemType; quantity: number }[]
  >([]);
  // const [loungeItems, setLoungeItems] = useState<LoungeItemType[]>([]); // State for lounge items
  // Spring animation for fade-in effect
  const fadeInProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 }, // Customize the fade-in duration
  });

  // Once the preloader has shown for a while, we hide it and show the signup page
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the preloader after 3 seconds
    }, 3000); // Preloader stays for 3 seconds
    return () => clearTimeout(timer); // Clear timer when the component unmounts
  }, []);

  // Example lounge items, replace this with your actual data fetching logic
  // useEffect(() => {
  //   // Replace this with actual API call or data fetching logic
  //   const fetchLoungeItems = async () => {
  //     const items: LoungeItemType[] = [
  //       { id: 1, name: "Item 1", description: "Description 1", price: 10, image: "/path/to/image1.jpg" },
  //       { id: 2, name: "Item 2", description: "Description 2", price: 15, image: "/path/to/image2.jpg" },
  //       // Add more items as needed
  //     ];
  //     setLoungeItems(items);
  //   };
  //   fetchLoungeItems();
  // }, []);
  const hideCartOnRoutes = ["/login", "/", "/forgot-password", "/checkout"];
  return (
    <div>
      {loading &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" ? (
        <Preloader />
      ) : (
        <Router>
          {/* Render ShoppingCart only if current route is not in hideCartOnRoutes */}
          {!hideCartOnRoutes.includes(location.pathname) && (
            <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
          )}
          <animated.div id="content" className="block" style={fadeInProps}>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
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
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/haha" element={<Haha />} />
            </Routes>
          </animated.div>
        </Router>
      )}
    </div>
  );
};

export default App;
