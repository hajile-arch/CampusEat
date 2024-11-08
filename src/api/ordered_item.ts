import supabase from "../utils/supabase";

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

export const deleteOrderedItem = async (field: string, value: string) => {
  await supabase.from("ordered_item").delete().eq(field, value);
};
