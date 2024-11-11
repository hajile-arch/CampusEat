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

const MyOrders = () => {
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
            {pendingOrders.map((order, key) => (
              <div
                key={key}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Order ID: <span className="font-bold">{order.id}</span>
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Status:{" "}
                  <span className="text-yellow-600 font-semibold">
                    {order.status}
                  </span>
                </p>

                {/* Displaying Delivery Details for Delivering Orders */}
                {order.status === "Delivering" && order.deliveryDetails && (
                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      <strong>Delivery Student:</strong>
                    </p>
                    <p>ID: {order.deliveryDetails.studentId}</p>
                    <p>Name: {order.deliveryDetails.studentName}</p>
                    <p>Phone: {order.deliveryDetails.phoneNumber}</p>
                  </div>
                )}

                <div className="mt-3">
                  <p className="text-md font-medium text-gray-600 mb-2">
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

                {/* Total Price with Service Charge */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-800">
                    <strong>Total Price:</strong>{" "}
                    <span className="text-xl text-green-600 font-bold">
                      ${calculateTotalPrice(order.items).toFixed(2)}{" "}
                    </span>
                    <span className="text-sm text-gray-500">
                      (Including RM 2 service charge)
                    </span>
                  </p>

                  <div className="flex justify-end mt-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out">
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
