import React from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoungeItemType } from "../types";

interface StudentLoungeProps {
  cartItems: { item: LoungeItemType; quantity: number }[];
  setCartItems: React.Dispatch<React.SetStateAction<{ item: LoungeItemType; quantity: number }[]>>;
}

const StudentLounge: React.FC<StudentLoungeProps> = ({ loungeItems = studentLoungeData, cartItems, setCartItems }) => { // Use studentLoungeData as default
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleAddToOrder = (item: LoungeItemType) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.item.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
    alert(`Added ${item.name} to order!`);
  };

  const handleQuantityChange = (item: LoungeItemType, quantity: number) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.item.id === item.id);
    const updatedCartItems = [...cartItems];

    if (quantity > 0) {
      updatedCartItems[existingItemIndex].quantity = quantity;
    } else {
      updatedCartItems.splice(existingItemIndex, 1);
    }

    setCartItems(updatedCartItems);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );
  };

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { cartItems, total: calculateTotal() } });
  };

  const uniqueItemCount = cartItems.length;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      <h2 className="text-4xl font-bold text-gray-800 mt-8 mb-6">Student Lounge</h2>

      <div className="flex justify-center w-full px-6">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl`}>
          {loungeItems.map((item) => ( // Use loungeItems (default: studentLoungeData)
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
              style={{ width: "250px", height: "300px" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 flex flex-col h-[calc(100%-8rem)] justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{item.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-gray-800">
                    ${item.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleAddToOrder(item)}
                    className="px-2 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
      >
        <FaShoppingCart size={24} />
        <span className="absolute top-0 left-8 bg-red-600 text-white rounded-full text-xs px-1 transform -translate-x-1 -translate-y-1/2">
          {uniqueItemCount}
        </span>
      </button>

      {isCartOpen && (
        <div className="fixed inset-y-0 left-0 bg-white shadow-lg w-80 z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
          <div className="p-6 relative">
            <button
              onClick={toggleCart}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-lg font-bold mb-4">Shopping Cart</h3>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map(({ item, quantity }) => (
                  <li key={item.id} className="flex justify-between items-center mb-2">
                    <span
                      className="flex-1 mr-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={item.name}
                    >
                      {item.name}
                    </span>
                    <div className="flex items-center" style={{ width: "80px" }}>
                      <input
                        type="number"
                        value={quantity}
                        min="0"
                        onChange={(e) =>
                          handleQuantityChange(item, Number(e.target.value))
                        }
                        className="w-16 border rounded p-1 text-center"
                      />
                      <button
                        onClick={() => handleQuantityChange(item, 0)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <span className="w-16 text-right">
                      ${(item.price * quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
            <hr className="my-4 border-gray-500" />
            <div className="flex justify-between items-center mt-2 font-bold">
              <button
                onClick={proceedToCheckout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Pay Now
              </button>
              <span>Total: ${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <p className="text-gray-600 mt-6 text-sm">Enjoy your time at the Student Lounge! Order what you like!</p>
    </div>
  );
};

export default StudentLounge;
