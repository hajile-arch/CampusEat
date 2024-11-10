import { useEffect, useState } from "react";
import { readOrder } from "../api/order";
import { OrderType } from "../types";

const CheckOrders = () => {
  const [myOrders, setMyOrders] = useState<OrderType[]>([]);
  const [otherOrders, setOtherOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    void (async () => {
      readOrder("*").then(async (orders: OrderType[]) => {
        const myOrderLists = orders?.filter((order) => {
          return order.from_user_id.toString() === "B1234567";
        });
        setMyOrders(myOrderLists);
        const otherOrderLists = orders?.filter((order) => {
          return order.from_user_id.toString() !== "B1234567";
        });
        setOtherOrders(otherOrderLists);
      });
    })();
  });
  // const name1 = "Harry Liow";
  // const studentId1 = "B1234567";

  // const name2 = "Elijah Wong"
  // const studentId2 = "B2201651"

  return null;
};
export default CheckOrders;
