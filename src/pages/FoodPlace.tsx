// FoodPlace.tsx
import Option from "../Components/FoodPlace/Option";
import { Navigate } from "react-router-dom";
import ShoppingCart from "../Components/ShoppingCart";
import { ItemType } from "../types";
import { FormEvent, useEffect, useState } from "react";
import { readAllItems } from "../services/item";

interface FoodPlaceProps {
  cartItems: { item: ItemType; quantity: number }[];
  setCartItems: React.Dispatch<
    React.SetStateAction<{ item: ItemType; quantity: number }[]>
  >;
}

const FoodPlace: React.FC<FoodPlaceProps> = ({ cartItems, setCartItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodItems, setFoodItems] = useState<ItemType[]>([]);
  const [goBack, setGoBack] = useState(false);
  const [filteredFoods, setFilteredFoods] = useState<ItemType[]>([]);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  const handleBackClick = () => {
    setGoBack(true);
  };

  useEffect(() => {
    void (async () => {
      await readAllItems("*, item_category(*)").then((items) => {
        setFoodItems(items as unknown as ItemType[]);
      });
    })();
  }, []);

  const handleSubmitButtonState = (searchQuery: string) => {
    if (searchQuery == null || searchQuery.trim() === "") {
      console.log("empty");
      setDisableSubmitButton(true);
    } else {
      console.log("not empty");
      setDisableSubmitButton(false);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredFoodItems = foodItems.filter((item) => {
      return item.item_name
        .toLowerCase()
        .trim()
        .includes(searchQuery.toLowerCase().trim());
    });
    setFilteredFoods(filteredFoodItems);
  };

  if (goBack) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="fixed h-screen w-screen">
      <div className="absolute inset-0 bg-white bg-opacity-100"></div>
      <div className="relative flex flex-col h-full">
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 p-2 bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex flex-col justify-center items-center h-1/2 text-center mt-4">
          <div className="bebas-neue-regular text-black font-bold text-[6rem] leading-[100px]">
            EAT WHAT TODAY BRO?
          </div>
          <p className="text-black text-xl montserrat-normal mt-2">
            Choose from our venue options below
          </p>
          <p className="text-black text-[15px] mt-3">
            Different Variety <span className="text-yellow-400">Everyday!</span>
          </p>
        </div>

        <form
          className="flex justify-center items-center gap-4 mb-10"
          onSubmit={(e) => handleSearch(e)}
        >
          <input
            type="text"
            placeholder="Search Foods"
            className="p-2 border rounded-md w-1/2 border-black"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSubmitButtonState(e.target.value);
            }}
          />
          <button
            disabled={disableSubmitButton}
            className={`${
              disableSubmitButton
                ? "bg-[#c9dbff]"
                : "bg-[#497cf4] hover:bg-[#3559ab]"
            } py-2 px-4 transition-colors duration-500 text-white rounded-md`}
          >
            Search
          </button>
        </form>

        <div className="flex justify-center items-center h-[50%] bg-slate-900 py-2">
          <div className="grid grid-cols-3 gap-6 p-2">
            {filteredFoods.length > 0 ? (
              filteredFoods
                .slice(0, 3)
                .map((food, key) => (
                  <Option
                    key={key}
                    imageSrc={`/img/food_truck/${food.item_name
                      .replace(/ /g, "_")
                      .toLowerCase()}.jpg`}
                    imageTitle={food.item_name}
                    linkTo={`/${food.item_category.category_type
                      .toLowerCase()
                      .replace(/ /g, "-")}/${food.item_category.category_name
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                  />
                ))
            ) : (
              // Show default venue options if no search results
              <>
                <Option
                  imageSrc="/food_truck_area.jpeg"
                  imageTitle="RED BRICK AREA"
                  linkTo="/red-brick-area"
                />
                <Option
                  imageSrc="/block_h_cafe.jpeg"
                  imageTitle="BLOCK H CAFE"
                  linkTo="/block-h-cafe"
                />
                <Option
                  imageSrc="/student_lounge.jpeg"
                  imageTitle="STUDENT LOUNGE"
                  linkTo="/student-lounge"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Render the ShoppingCart component */}
      <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default FoodPlace;
