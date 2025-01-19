import { useState, useEffect } from "react";

export default function useInput(validateFn) {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const isValueValid = validateFn(inputValue);
  const isInputValid = isValueValid && isTouched
  
  useEffect(() => {
    if (!isValueValid && isTouched) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }, [isValueValid, isTouched]);
  
  const changeValueHandler = (e) => {
    setIsTouched(true)
    setInputValue(e.target.value)
  }
  
  const blurInputHandler = () => {
    setIsTouched(true)
  }
  
  const resetInput = () => {
    setInputValue("");
    setIsTouched(false)
  }
  
  return {
    inputValue,
    hasError,
    isInputValid,
    isValueValid,
    changeValueHandler,
    blurInputHandler,
    resetInput
  }
}