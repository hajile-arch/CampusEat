import { useEffect, useState } from "react";
import { readOrder } from "../services/order";
import { OrderTypeAndOrderedItemType } from "../types";
import MyOrders from "../Components/CheckOrders/MyOrders";
import OtherOrders from "../Components/CheckOrders/OtherOrders";

const CheckOrders = () => {
  const [myOrders, setMyOrders] = useState<OrderTypeAndOrderedItemType[]>([]);
  const [otherOrders, setOtherOrders] = useState<OrderTypeAndOrderedItemType[]>(
    []
  );

  useEffect(() => {
    const getOrderAndOrderedItem = async () => {
      readOrder("*, ordered_item(*)").then(
        async (orders: OrderTypeAndOrderedItemType[]) => {
          const myOrderLists = orders?.filter((order) => {
            return order.from_user_id.toString() === "B1234567";
          });
          setMyOrders(myOrderLists);
          const otherOrderLists = orders?.filter((order) => {
            return order.from_user_id.toString() !== "B1234567";
          });
          setOtherOrders(otherOrderLists);
        }
      );
    };
    getOrderAndOrderedItem();
  });

  // const getOrderedItem = async (order_id: string) => {
  //   await readOrderedItem("*", "order_id", order_id);
  // };

  // const name1 = "Harry Liow";
  // const studentId1 = "B1234567";

  // const name2 = "Elijah Wong";
  // const studentId2 = "B2201651";

  return (
    <div className="flex w-full">
      <MyOrders />
      <OtherOrders />
    </div>
  );
};

export default CheckOrders;
