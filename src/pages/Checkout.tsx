<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ItemType } from "../types";
// import { FaQrcode } from "react-icons/fa";
import { createOrder, getOrder } from "../api/order";
import supabase from "../utils/supabase";

interface CartItem {
  item: ItemType;
  quantity: number;
}

const Checkout = () => {
  const currentLocation = useLocation();
  const { cartItems, total } = currentLocation.state as {
    cartItems: CartItem[];
    total: number;
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [countDown, setCountDown] = useState(0);
  const [location, setLocation] = useState("");
  // const [countdown, setCountdown] = useState(5 * 60);
  // const [isMessageEditable, setIsMessageEditable] = useState(true);
  // const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  // const [feedback, setFeedback] = useState("");
  // const [thankYouMessage, setThankYouMessage] = useState("");

  const handleConfirmOrder = async () => {
    setIsButtonDisabled(true);
    setCountDown(5);

    // for (const cartItem of cartItems) {
    //   const order_id = await createOrder(
    //     cartItem.item.item_id,
    //     cartItem.quantity,
    //     cartItem.item.item_price * cartItem.quantity,
    //     "B1234567",
    //     location
    //   );
    //   console.log(order_id);
    // }
  };

  useEffect(() => {
    if ((countDown > 0 && location.trim() !== "") || !location) {
      const timer = setInterval(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
      }, 1000);
      console.log(countDown);

      return () => clearInterval(timer);
    } else {
      setIsButtonDisabled(false);
    }
  }, [countDown, location]);

  const formatCountdown = () => {
    const minutes = Math.floor(countDown / 60);
    const seconds = countDown % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // if (countDown > 0) {
  //   useEffect(() => {
  //     void (async () => {
  //       const order = await getOrder("*", "order_id");
  //     })();
  //   }, []);
  // }

  // const handleFeedbackSubmit = () => {
  //   console.log("Feedback Submitted:", feedback);
  //   setIsFeedbackModalOpen(false);
  //   setFeedback("");

  //   setThankYouMessage("Thank you for your feedback!");
  //   setTimeout(() => {
  //     setThankYouMessage("");
  //   }, 5000);
  // };
=======
import React from 'react';
>>>>>>> 3c434728b09e4c98711848aab6513f1892209c28

const Checkout: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Checkout</h1>
      {/* Add logic to display order history */}
    </div>
  );
};

export default Checkout;
