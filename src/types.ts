export interface UserType {
  student_id: string;
  created_at: string;
  name: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface LoungeItemType {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface ItemType {
  item_id: string;
  created_at: string;
  updated_at: string;
  item_name: string;
  item_description: string;
  item_price: number;
  category_id: ItemCategoryType;
}

export interface ItemCategoryType {
  category_id: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_type: string;
}

export interface OrderType {
  order_id: string;
  created_at: string;
  item_id: ItemType;
  unit: number;
  total_price: number;
  from_user_id: UserType;
  to_user_id: UserType;
  location: string;
  status: string;
}

export interface FormType {
  studentID: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CandidateKeyType {
  student_id: string;
  email: string;
  phone_number: string;
}

export interface FoodTruckType {
  category_id: string;
  category_name: string;
  category_img: string;
}
