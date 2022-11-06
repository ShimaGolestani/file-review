import React, { useState } from "react";

const Lable = () => {
  const [symbolName] = useState();

  return (
    <div>
      <label className="text-black bg-search-color rounded-full mb-2 h-10 w-full text-center relative">
        {" "}
        {symbolName}{" "}
      </label>
    </div>
  );
};

export default Lable;
