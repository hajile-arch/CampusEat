import React from "react";
import Spline from '@splinetool/react-spline';

const CheckOrders: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
      <Spline scene="https://prod.spline.design/D0zhXvbd42xnew7J/scene.splinecode" />
      </div>
      
      Robot that follows the cursor
      <div className="relative  z-10">
        <Spline scene="https://prod.spline.design/snQWH3sGfetfa9qO/scene.splinecode" />
      </div>
    </div>
  );
};

export default CheckOrders;
