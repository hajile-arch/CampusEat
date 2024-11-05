import React from "react";
import Content from "../Components/Homepage/Content";
import Scrollbar from "../Components/Homepage/Scrollbar";

const name: string = "Lucas Goh Yuan Kai";

const Home: React.FC = () => {
  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <div className="text-lg border-2 font-semibold text-white px-4 py-2 rounded-lg border-gray-300 shadow-md transition duration-300 hover:bg-white hover:text-black">
          <h1>Hi, {name}</h1>
        </div>
      </div>
      <div className="h-screen flex relative">
        <Scrollbar />
        <Content />
      </div>
    </>
  );
};

export default Home;
