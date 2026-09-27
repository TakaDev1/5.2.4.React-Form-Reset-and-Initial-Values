import React from "react";
import useDynamicInputForm from "../hooks/useDynamicInputForm";

const DynamicInput = () => {
  const { inputs, handleInput, handleChangeInput } = useDynamicInputForm();

  return (
    <div className="flex flex-col w-1/3 mx-auto gap-5">
      {inputs.map((input, index) => (
        <input
          key={index}
          type="text"
          value={input}
          onChange={(event) => handleChangeInput(index, event.target.value)}
          className="border text-white py-2 text-center"
        />
      ))}
      <button
        onClick={handleInput}
        className="bg-gray-500 text-white hover:opacity-80 cursor-pointer py-2 rounded-full font-bold"
      >
        追加
      </button>
    </div>
  );
};

export default DynamicInput;
