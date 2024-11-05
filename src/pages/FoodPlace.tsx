// FoodPlace.tsx
import Option from '../Components/FoodPlace/Option';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import ShoppingCart from '../Components/ShoppingCart'; // Import your ShoppingCart component
import { ItemType } from '../types';

interface FoodPlaceProps {
  cartItems: { item: ItemType; quantity: number }[];
  setCartItems: React.Dispatch<React.SetStateAction<{ item: ItemType; quantity: number }[]>>;
}

const FoodPlace: React.FC<FoodPlaceProps> = ({ cartItems, setCartItems }) => {
  const [goBack, setGoBack] = useState(false);

  const handleBackClick = () => {
    setGoBack(true);
  };

  if (goBack) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="fixed h-screen w-screen">
      <div className="absolute inset-0 bg-white bg-opacity-100"></div>
      <div className="relative flex flex-col h-full">
        <button onClick={handleBackClick} className="absolute top-4 left-4 p-2 bg-transparent">
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

        <div className="flex flex-col justify-center items-center h-1/2 text-center">
          <div className="bebas-neue-regular text-black font-bold text-[6rem] leading-[100px]">
            EAT WHAT TODAY BRO ?
          </div>
          <p className="text-black text-xl montserrat-normal mt-2">
            Choose from our venue options below
          </p>
          <p className="text-black text-[15px] mt-3">
            Different Variety <span className='text-yellow-400'><u>Everyday!</u></span>
          </p>
        </div>

        <div className="flex justify-center items-center h-[50%] bg-slate-900">
          <div className="grid grid-cols-3 gap-6 p-2">
            <Option imageSrc='\food_truck_area.jpeg' imageTitle='RED BRICK AREA' linkTo="/red-brick-area" />
            <Option imageSrc='\block_h_cafe.jpeg' imageTitle='BLOCK H CAFE' linkTo="/block-h-cafe" />
            <Option imageSrc='\student_lounge.jpeg' imageTitle='STUDENT LOUNGE' linkTo="/student-lounge" />
          </div>
        </div>
      </div>

      {/* Render the ShoppingCart component */}
      <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default FoodPlace;
