import supabase from "../utils/supabase";

export const createOrder = async (
  item_id: string,
  unit: number,
  total_price: number,
  from_user_id: string,
  location: string
) => {
  console.log("------------------------------------------");
  console.log("item_id: ", item_id);
  console.log("unit: ", unit);
  console.log("total_price: ", total_price);
  console.log("from_user_id: ", from_user_id);
  console.log("location: ", location);
  console.log("------------------------------------------");
  const { data, error } = await supabase.from("order").insert([
    {
      item_id: item_id,
      unit: unit,
      total_price: total_price,
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
