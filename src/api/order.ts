import supabase from "../utils/supabase";

export const readOrder = async (
  attributes: string,
  field: string,
  value: string
) => {
  const { data, error } = await supabase
    .from("order")
    .select(attributes)
    .eq(field, value);

  if (error) {
    console.log("error reading order: ", error);
  } else {
    if (data) {
      return data;
    } else {
      console.log("no data returned");
      return null;
    }
  }
};

export const createOrder = async (from_user_id: string, location: string) => {
  const { data, error } = await supabase
    .from("order")
    .insert([
      {
        from_user_id: from_user_id,
        location: location,
        status: "Pending",
      },
    ])
    .select();

  if (error) {
    console.log("error creating order: ", error);
    return null;
  } else {
    if (data) {
      return data[0].order_id;
    } else {
      console.log("no data returned");
      return null;
    }
  }
};

export const deleteOrder = async (field: string, value: string) => {
  await supabase.from("order").delete().eq(field, value);
};

// export const getOrder = async (
//   attributes: string,
//   field: string,
//   value: string
// ) => {
//   const { data, error } = await supabase
//     .from("order")
//     .select(attributes)
//     .eq(field, value);

//   if (error) {
//     console.log("error fetching order: ", error);
//   } else {
//     return data;
//   }
// };

// export const updateOrder = async () => {};

// // Function to update order status
// export const updateOrderStatus = async (orderId: string, status: string) => {
//   const { data, error } = await supabase
//     .from("order")
//     .update({ status })
//     .eq("id", orderId);

//   if (error) {
//     console.error("error updating order status: ", error);
//     return false;
//   }

//   if (data) {
//     return data; // Ensure data is not null before accessing it
//   } else {
//     console.error("no data returned from update");
//     return false;
//   }
// };
