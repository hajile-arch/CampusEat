import supabase from "../utils/supabase";

export const createOrder = async (from_user_id: string, location: string) => {
  const { data, error } = await supabase.from("order").insert([
    {
      from_user_id: from_user_id,
      location: location,
      status: "Pending",
    },
  ]);

  if (error) {
    console.log("Error creating order: ", error);
    return null; // Return null if there is an error
  }

  if (data) {
    return data[0]; // Ensure data is not null before accessing it
  } else {
    console.log("No data returned from insert.");
    return null;
  }
};

export const createOrderedItem = async (
  order_id: string,
  item_id: string,
  unit: number,
  total_price: number
) => {
  const { data, error } = await supabase.from("ordered_item").insert([
    {
      order_id: order_id,
      item_id: item_id,
      unit: unit,
      total_price: total_price,
    },
  ]);

  if (error) {
    console.log("Error creating ordered item: ", error);
    return null;
  }

  if (data) {
    return data[0];
  } else {
    return null;
  }
};

export const getOrder = async (
  attributes: string,
  field: string,
  value: string
) => {
  const { data, error } = await supabase
    .from("order")
    .select(attributes)
    .eq(field, value);

  if (error) {
    console.log("Error fetching order: ", error);
  } else {
    return data;
  }
};

export const updateOrder = async () => {};

// Function to update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  const { data, error } = await supabase
    .from("order")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error);
    return false;
  }

  if (data) {
    return data; // Ensure data is not null before accessing it
  } else {
    console.error("No data returned from update.");
    return false;
  }
};
