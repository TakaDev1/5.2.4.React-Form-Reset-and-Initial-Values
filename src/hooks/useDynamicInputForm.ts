import { useState } from "react";

const useDynamicInputForm = () => {
  const [inputs, setInputs] = useState<string[]>([""]);

  const handleInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleChangeInput = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return {
    inputs,
    handleInput,
    handleChangeInput,
  };
};

export default useDynamicInputForm;
