type Order = {
  id: string;
  status: string;
  items: { name: string; quantity: number; price: string }[];
  location: string;
};

const orders: Order[] = [
  {
    id: "123456789",
    status: "Pending",
    items: [
      { name: "Burger", quantity: 2, price: "$15.99" },
      { name: "Fries", quantity: 1, price: "$7.99" },
    ],
    location: "Building A, Room 101",
  },
  {
    id: "987654321",
    status: "Pending",
    items: [{ name: "Pizza", quantity: 3, price: "$22.50" }],
    location: "Library, Floor 2",
  },
  {
    id: "987654321",
    status: "Pending",
    items: [
      { name: "hehe", quantity: 3, price: "$22.50" },
      { name: "Burger", quantity: 2, price: "$15.99" },
      { name: "Fries", quantity: 1, price: "$7.99" },
    ],
    location: "Library, Floor 2",
  },
];

const OtherOrders = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-1/2 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Other Orders
        </h2>
        <div className="space-y-6">
          {orders.map((order, key) => (
            <div
              key={key}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Order ID: <span className="font-bold">{order.id}</span>
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Status:{" "}
                <span
                  className={`${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  } font-semibold`}
                >
                  {order.status}
                </span>
              </p>

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

              <div className="mt-3 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {order.location}
                </p>

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out">
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherOrders;
