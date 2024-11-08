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

  return (
    <div className="flex h-screen">
      {/* Left Side: Checkout Summary */}
      <div className="w-1/2 p-10 border-r border-gray-300 flex flex-col justify-between">
        {/* Order Summary */}
        <div>
          <h1 className="text-4xl font-bold mb-6">Checkout</h1>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="mb-4">
            {cartItems.map(({ item, quantity }) => (
              <li
                key={item.item_id}
                className="flex justify-between items-center mb-2"
              >
                <span className="font-medium w-2/4">{item.item_name}</span>
                <span className="w-1/4 text-right">
                  {quantity} x ${item.item_price.toFixed(2)}
                </span>
                <span className="w-1/4 text-right">
                  ${(item.item_price * quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-4" />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-2 py-4">
            <label className="text-neutral-500" htmlFor="location">
              Where do you want this to deliver to?
            </label>
            <input
              disabled={isButtonDisabled && countDown > 0}
              className="border-2 rounded-lg ps-3 h-10"
              type="text"
              name=""
              id="location"
              onChange={(e) => {
                setLocation(e.target.value);
                if (e.target.value == null || e.target.value.trim() == "") {
                  setIsButtonDisabled(true);
                } else {
                  setIsButtonDisabled(false);
                }
              }}
            />
          </div>

          <button
            disabled={isButtonDisabled}
            onClick={handleConfirmOrder}
            className={`${
              isButtonDisabled ? "bg-blue-200" : "bg-blue-600 hover:bg-blue-700"
            } mt-6 px-4 py-2 transition-colors duration-500 text-white rounded-lg`}
          >
            {isButtonDisabled && countDown > 0
              ? "Request Again"
              : "Request Order"}
          </button>

          {isButtonDisabled && countDown > 0 && (
            <div className="mt-6 text-md text-red-500">
              You may request the order again if your order request is not
              accepted after {formatCountdown()} minutes
            </div>
          )}

          {/* {isConfirmed && (
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Give Feedback
            </button>
          )} */}

          {/* {thankYouMessage && (
            <div className="mt-4 text-green-600 text-lg font-semibold">
              {thankYouMessage}
            </div>
          )} */}
        </div>
      </div>

      {/* Right Side: QR Code */}
      {/* <div className="w-1/2 p-8 bg-gray-100 flex flex-col justify-center">
        <div className="flex items-center justify-center mb-8 border-b pb-4 h-1/2 bg-slate-300">
          <FaQrcode size={100} className="text-gray-600 mr-4" />
          <div>
            <h2 className="text-xl font-bold">TNG Payment</h2>
            <p className="text-gray-600">
              Scan the QR code to complete your payment.
            </p>
          </div>
        </div>

        <div className="flex-grow flex flex-col">
          <p className="mt-10 mb-2 text-gray-700 font-medium">
            If you have any specific requests, please write them down
          </p>
          <textarea
            placeholder="Message for seller (optional)"
            className="w-full p-4 border rounded-lg resize-none"
            rows={5}
            disabled={!isMessageEditable}
            onChange={(e) => setFeedback(e.target.value)}
            value={isMessageEditable ? feedback : ""}
          ></textarea>
        </div>
      </div> */}

      {/* Feedback Modal */}
      {/* {isFeedbackModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
            <textarea
              placeholder="Your feedback"
              className="w-full p-4 border rounded-lg resize-none"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Checkout;
