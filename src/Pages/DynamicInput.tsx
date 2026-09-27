import React from "react";
import useDynamicInputForm from "../hooks/useDynamicInputForm";

const DynamicInput = () => {
  const { inputs, handleInput, handleChangeInput } = useDynamicInputForm();

  return (
    <div>
      {inputs.map((input, index) => (
        <input
          key={index}
          type="text"
          value={input}
          onChange={(event) => handleChangeInput(index, event.target.value)}
        />
      ))}
      <button onClick={handleInput}>追加</button>
    </div>
  );
};

export default DynamicInput;
