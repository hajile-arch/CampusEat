import { Profiler, useEffect, useState } from "react";
import { readOrder } from "../services/order";
import { OrderTypeAndOrderedItemType } from "../types";
import MyOrders from "../Components/CheckOrders/MyOrders";
import OtherOrders from "../Components/CheckOrders/OtherOrders";
import { getUserSession } from "../services/get_session";
import { readProfile } from "../services/profile";

const CheckOrders = () => {
  const [studentId, setStudentId] = useState("");
  const [myOrders, setMyOrders] = useState<OrderTypeAndOrderedItemType[]>([]);
  const [otherOrders, setOtherOrders] = useState<OrderTypeAndOrderedItemType[]>(
    []
  );

  useEffect(() => {
    void (async () => {
      await getUserSession().then(async (user) => {
        await readProfile("*", "user_id", user?.id).then((profile) => {
          setStudentId(profile[0].student_id);
        });
      });
    })();
  }, []);

  useEffect(() => {
    const getOrderAndOrderedItem = async () => {
      readOrder("*, ordered_item(*)").then(
        async (orders: OrderTypeAndOrderedItemType[]) => {
          const myOrderLists = orders?.filter((order) => {
            return order.from_user_id.toString() === studentId;
          });
          setMyOrders(myOrderLists);
          const otherOrderLists = orders?.filter((order) => {
            return order.from_user_id.toString() !== studentId;
          });
          setOtherOrders(otherOrderLists);
        }
      );
    };
    getOrderAndOrderedItem();
  }, [studentId]);

  return (
    <div className="flex w-full">
      <MyOrders myOrders={myOrders} />
      <OtherOrders />
    </div>
  );
};

export default CheckOrders;
