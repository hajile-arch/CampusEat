import supabase from "../utils/supabase";

export const readItemCategory = async (attributes: string, field: string, value: string) => {
    const { data, error } = await supabase
        .from("item_category")
        .select(attributes)
        .eq(field, value)

    if (error) {
        console.log("error reading item: ", error);
    } else {
        return data;
    }
};