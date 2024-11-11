import { useLocation, useNavigate } from "react-router-dom";
import { ItemType } from "../types";
import { useEffect, useState } from "react";
import ItemList from "../Components/Checkout/ItemList";
import { createOrder, deleteOrder, readOrder } from "../services/order";
import { createOrderedItem, deleteOrderedItem } from "../services/ordered_item";
import PendingOrder from "../Components/Checkout/PendingOrder";

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
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [orderId, setOrderId] = useState("");

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
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    const handleRequestStatus = async () => {
      if (orderId && orderId !== "") {
        const data = (await readOrder("status", "order_id", orderId)) as
          | [{ status: string }]
          | [];
        if (data && data[0]?.status !== "Pending") {
          navigate("/check-orders");
        }
      }
    };
    handleRequestStatus();
  }, [seconds, orderId, navigate]);

  useEffect(() => {
    const handleCountdownComplete = async () => {
      if (seconds === 0 && orderId !== "") {
        await deleteOrderedItem("order_id", orderId).then(async () => {
          await deleteOrder("order_id", orderId);
        });
      }
    };
    handleCountdownComplete();
  }, [seconds, orderId]);

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
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
        <ItemList right={`${total}`} total />
        <ItemList left="Service Fee *" right={"2.00"} />
        <ItemList middle="Total" right={`RM ${total + 2}`} total />
      </div>
      <PendingOrder
        seconds={seconds}
        setInputValue={setInputValue}
        disabled={disabled}
        setSeconds={setSeconds}
        handleCreateOrder={handleCreateOrder}
        formatTime={formatTime}
      />
    </div>
  );
};

export default Checkout;
