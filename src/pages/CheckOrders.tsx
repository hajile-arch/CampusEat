import { useEffect, useState } from "react";
import { readOrder } from "../services/order";
import { OrderTypeAndOrderedItemType } from "../types";
import OrderSection from "../Components/CheckOrders/OrderSection";
import { getUserSession } from "../services/get_session";
import { readProfile } from "../services/profile";

const CheckOrders = () => {
  const [studentId, setStudentId] = useState("");
  const [myOrders, setMyOrders] = useState<OrderTypeAndOrderedItemType[]>([]);
  const [otherOrders, setOtherOrders] = useState<OrderTypeAndOrderedItemType[]>(
    []
  );
  const [refresh, setRefresh] = useState(0);

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
  }, [studentId, refresh]);

  useEffect(() => {
    console.log("test: ", otherOrders);
  }, [otherOrders]);

  return (
    <div className="flex w-full">
      <OrderSection
        title={"My Orders"}
        orders={myOrders}
        firstStatus="Delivering"
        secondStatus="Completed"
        setRefresh={setRefresh}
      />
      <OrderSection
        title={"Other Orders"}
        orders={otherOrders}
        firstStatus="Delivering"
        secondStatus="Pending"
        setRefresh={setRefresh}
      />
      {/* <OtherOrders otherOrders={otherOrders} /> */}
    </div>
  );
};

export default CheckOrders;
