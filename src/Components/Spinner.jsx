import React from "react";
import loading from "../Spinner.gif";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img
        src={loading}
        alt="Loading..."
        className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
      />
    </div>
  );
};

export default Spinner;
