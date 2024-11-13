import { useEffect, useState } from "react";
import { OrderTypeAndOrderedItemType } from "../../types";
import { readProfile } from "../../services/profile";

type Order = {
  id: string;
  status: string;
  items: { name: string; quantity: number; price: string }[];
  location: string;
  deliveryDetails?: {
    studentId: string;
    studentName: string;
    phoneNumber: string;
  };
};

const pendingOrders: Order[] = [
  {
    id: "123456789",
    status: "Delivering",
    items: [
      { name: "Burger", quantity: 2, price: "$15.99" },
      { name: "Fries", quantity: 1, price: "$7.99" },
    ],
    location: "Building A, Room 101",
    deliveryDetails: {
      studentId: "S12345",
      studentName: "John Doe",
      phoneNumber: "012-3456789",
    },
  },
];

const completedOrders: Order[] = [
  {
    id: "987654321",
    status: "Completed",
    items: [{ name: "Pizza", quantity: 3, price: "$22.50" }],
    location: "Library, Floor 2",
  },
];

interface MyOrdersProps {
  myOrders: OrderTypeAndOrderedItemType[];
}

const MyOrders: React.FC<MyOrdersProps> = ({ myOrders }) => {
  const [toUser, setToUser] = useState({ name: "", phone_number: "" });

  const getDeliverStudentInformation = (student_id: string) => {
    return readProfile("name, phone_number", "student_id", student_id);
  };

  const calculateTotalPrice = (
    items: { price: string; quantity: number }[]
  ): number => {
    const total = items.reduce(
      (acc, item) =>
        acc + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
    return total + 2; // Service charge of RM 2
  };

  return (
    <div className="min-h-screen bg-gray-100 w-1/2 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          My Orders
        </h2>

        {/* Pending Orders Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Pending Orders
          </h3>
          <div className="space-y-6">
            {myOrders
              .filter((order) => {
                return order.status === "Delivering";
              })
              .map((order, key) => {
                if (order.to_user_id) {
                  console.log("hit");
                  // getDeliverStudentInformation(order.to_user_id).then(
                  //   (data) => {
                  //     setToUser(data[0]);
                  //   }
                  // );
                }

                return (
                  <div
                    key={key}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Order ID: <span className="font-bold">{key + 1}</span>
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Status:{" "}
                      <span className="text-yellow-600 font-semibold">
                        {order.status}
                      </span>
                    </p>

                    <div className="mt-3 text-sm text-gray-600">
                      <p>
                        <strong>Delivery Student:</strong>
                      </p>
                      <p>ID: {order.to_user_id}</p>
                      <p>Name: {toUser.name}</p>
                      <p>Phone: {toUser.phone_number}</p>
                    </div>

                    <div className="mt-3">
                      <p className="text-md font-medium text-gray-600 mb-2">
                        Ordered Items:
                      </p>
                      <ul className="pl-5 list-disc text-sm text-gray-700 space-y-1">
                        {order.ordered_item.map((item, key) => {
                          <li key={key}>
                            {item.unit} x {item.name} - {item.total_price}
                          </li>;
                        })}
                        {/* {order.items.map((item, index) => (
                       
                      ))} */}
                      </ul>
                    </div>

                    <p className="mt-3 text-sm text-gray-600">
                      <strong>Location:</strong> {order.location}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-800">
                        <strong>Total Price:</strong>{" "}
                        <span className="text-xl text-green-600 font-bold">
                          {order.item}
                          {/* ${calculateTotalPrice(order.item).toFixed(2)}{" "} */}
                        </span>
                        <span className="text-sm text-gray-500">
                          (Including RM 2 service charge)
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Completed Orders Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Completed Orders
          </h3>
          <div className="space-y-6">
            {completedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Order ID: <span className="font-bold">{order.id}</span>
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Status:{" "}
                  <span className="text-green-600 font-semibold">
                    {order.status}
                  </span>
                </p>

                <div className="mt-3">
                  <p className="text-md font-medium semibold text-gray-600 mb-2">
                    Ordered Items:
                  </p>
                  <ul className="pl-5 list-disc text-sm text-gray-700 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity}x {item.name} - {item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  <strong>Location:</strong> {order.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
