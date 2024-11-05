import { FormType } from "../types";
import supabase from "../utils/supabase";

export const readUser = async (attributes: string) => {
  const { data, error } = await supabase.from("user").select(attributes);

  if (error) {
    console.log("error reading user: ", error);
  } else {
    return data;
  }
};

export const createUser = async (formData: FormType) => {
  const { error } = await supabase.from("user").insert([
    {
      name: formData.name,
      email: formData.email,
      student_id: formData.studentID,
      phone_number: formData.phoneNumber,
      password: formData.password,
    },
  ]);

  if (error) {
    console.error("error creating data: ", error);
    return false
  }
  return true
};
