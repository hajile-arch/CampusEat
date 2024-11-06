import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ItemType } from '../types';
import { FaQrcode } from 'react-icons/fa';

interface CartItem {
  item: ItemType;
  quantity: number;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const { cartItems, total } = location.state as { cartItems: CartItem[]; total: number };

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds
  const [isMessageEditable, setIsMessageEditable] = useState(true); // State to control message box editability
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // Feedback modal state
  const [feedback, setFeedback] = useState(''); // Feedback form state
  const [thankYouMessage, setThankYouMessage] = useState(''); // State for the "Thank you" message

  // Start countdown when payment is confirmed
  useEffect(() => {
    if (isConfirmed && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear timer when countdown reaches 0 or component unmounts
      return () => clearInterval(timer);
    }
  }, [isConfirmed, countdown]);

  const handleConfirmPayment = () => {
    setIsConfirmed(true);
    setIsMessageEditable(false); // Disable message box editing after confirming payment
  };

  // Format countdown as MM:SS
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = () => {
    console.log('Feedback Submitted:', feedback);
    setIsFeedbackModalOpen(false); // Close modal after feedback submission
    setFeedback(''); // Clear feedback field after submission

    // Show "Thank you" message for 5 seconds
    setThankYouMessage('Thank you for your feedback!');
    setTimeout(() => {
      setThankYouMessage(''); // Remove the message after 5 seconds
    }, 5000);
  };

  return (
    <div className="flex h-screen p-8">
      {/* Left Side: Checkout Summary */}
      <div className="w-1/2 p-6 border-r border-gray-300 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-6">Checkout</h1>

          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="mb-4">
            {cartItems.map(({ item, quantity }) => (
              <li key={item.item_id} className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.item_name}</span>
                <span>{quantity} x ${item.item_price.toFixed(2)}</span>
                <span className="text-right">${(item.item_price * quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <hr className="my-4" />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Confirm and Pay button */}
          {!isConfirmed ? (
            <button
              onClick={handleConfirmPayment}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm and Pay
            </button>
          ) : (
            <div className="mt-6 text-lg font-semibold text-red-600">
              Your food should arrive within: {formatCountdown()}. <br />
              If it doesn't, please click the feedback button below.
            </div>
          )}

          {/* Feedback Button (aligned with Confirm and Pay) */}
          {isConfirmed && (
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Give Feedback
            </button>
          )}

          {/* Thank you message */}
          {thankYouMessage && (
            <div className="mt-4 text-green-600 text-lg font-semibold">{thankYouMessage}</div>
          )}
        </div>
      </div>

      {/* Right Side: QR Code */}
      <div className="w-1/2 p-8 bg-gray-100 flex flex-col justify-center">
        {/* Top half: QR code, title, and description */}
        <div className="flex items-center justify-center mb-8 border-b pb-4 h-1/2 bg-slate-300">
          <FaQrcode size={100} className="text-gray-600 mr-4" />
          <div>
            <h2 className="text-xl font-bold">TNG Payment</h2>
            <p className="text-gray-600">Scan the QR code to complete your payment.</p>
          </div>
        </div>

        {/* Bottom half: Message box */}
        <div className="flex-grow flex flex-col">
          <p className="mt-10 mb-2 text-gray-700 font-medium">
            If you have any specific requests, please write them down
          </p>
          <textarea
            placeholder="Message for seller (optional)"
            className="w-full p-4 border rounded-lg resize-none"
            rows={5}
            disabled={!isMessageEditable} // Disable message box when payment is confirmed
          ></textarea>
        </div>
      </div>

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <textarea
              className="w-full p-4 border rounded-lg resize-none"
              rows={5}
              placeholder="Please provide your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
