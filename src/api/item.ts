import supabase from "../utils/supabase";
import { readItemCategory } from "./item_category";

export const readItem = async (attributes: string, category_name: string) => {
  const item_category = await readItemCategory(
    "category_id",
    "category_name",
    category_name
  );

  if (!item_category || !item_category[0]?.category_id) {
    throw new Error("category_id not found");
  }

  const category_id = item_category[0].category_id;

  if (!category_id) {
    throw new Error("category_name not found");
  }

  const { data, error } = await supabase
    .from("item")
    .select(attributes)
    .eq("category_id", category_id);

  if (error) {
    console.log("error reading item: ", error);
  } else {
    return data;
  }
};
