import { useLocation } from "react-router-dom";
import { ItemType } from "../types";
import { useEffect, useState } from "react";
import ItemList from "../Components/Checkout/ItemList";
import { createOrder, deleteOrder, readOrder } from "../api/order";
import { createOrderedItem, deleteOrderedItem } from "../api/ordered_item";

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

  const [disabled, setDisabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [delivering, setDelivering] = useState(false);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputValue]);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 10);

    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    let formattedSec;
    if (sec >= 10) {
      formattedSec = `:${sec}`;
    } else if (sec > 0 && sec < 10) {
      formattedSec = `:0${sec}`;
    } else {
      formattedSec = "";
    }
    return `${min}${formattedSec}`;
  };

  useEffect(() => {
    void (async () => {
      const status = (
        await readOrder("status", "order_id", orderId)
      )?.toString();

      if (status === "Delivering") {
        setDelivering(true);
      } else {
        if (seconds === 0 && orderId !== "") {
          await deleteOrderedItem("order_id", orderId).then(async () => {
            await deleteOrder("order_id", orderId);
          });
        }
      }
    })();
  }, [seconds, orderId, delivering]);

  const handleCreateOrder = async () => {
    await createOrder("B1234567", inputValue).then(async (order_id) => {
      setOrderId(order_id);
      for (const cartItem of cartItems) {
        await createOrderedItem(
          order_id,
          cartItem.item.item_id,
          cartItem.quantity,
          cartItem.item.item_price * cartItem.quantity
        );
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-dvh gap-4">
      <div className="flex flex-col gap-2 w-1/2 border-2 rounded-md p-7">
        <h1 className="text-2xl font-bold py-2">Checkout Summary</h1>
        <ItemList middle="Quantity" right="Subtotal" />
        {cartItems.map((cartItem, key) => {
          return (
            <ItemList
              key={key}
              left={cartItem.item.item_name}
              middle={cartItem.quantity.toString()}
              right={`${cartItem.item.item_price * cartItem.quantity}`}
            />
          );
        })}
        <ItemList middle="Total" right={`RM ${total}`} total />
      </div>

      <div className="flex flex-col gap-2 border-2 rounded-md w-1/2 p-7">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-neutral-500">
              Where do you want it to be delivered to?
            </label>
            <input
              className="border-2 rounded-md h-10 ps-3"
              type="text"
              placeholder="Location"
              disabled={seconds > 0 || disabled}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              className={`${
                seconds > 0 || disabled
                  ? "bg-blue-200"
                  : "bg-blue-600 hover:bg-blue-700"
              } rounded-md text-white px-3 h-10 transition-colors duration-500`}
              disabled={seconds > 0 || disabled}
              onClick={async () => {
                setSeconds(5 * 60);
                handleCreateOrder();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
        {seconds > 0 && (
          <p className="text-sm text-red-500">
            You may request again after {formatTime(seconds)} minutes
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
