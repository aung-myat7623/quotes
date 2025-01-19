import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { uiActions } from "../store/ui.js";

import useInput from "../hooks/useInput";
import useHttp from "../hooks/useHttp";

import Button from "../components/Button";

const isNotEmpty = (value) => value.length !== 0;

export default function NewQuotePage() {
  const dispatch = useDispatch()
  
  const { sendRequest, loading } = useHttp();
  
  const navigate = useNavigate()
  const { inputValue: titleValue, hasError: titleHasError, isInputValid: isTitleInputValid, isValueValid: isTitleValueValid, changeValueHandler: changeTitleValueHandler, blurInputHandler: blurTitleInputHandler, resetInput: resetTitleInput } = useInput(isNotEmpty);
  const { inputValue: quoteValue, hasError: quoteHasError, isInputValid: isQuoteInputValid, isValueValid: isQuoteValueValid, changeValueHandler: changeQuoteValueHandler, blurInputHandler: blurQuoteInputHandler, resetInput: resetQuoteInput } = useInput(isNotEmpty);
 
  const transformData = (data) => {
    dispatch(uiActions.addQuote({
      id: data.name,
      title: titleValue,
      quote: quoteValue,
      comments: []
    }))
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    if (!titleHasError && isTitleInputValid && !quoteHasError && isQuoteInputValid) {
      sendRequest({
        url: "https://react-http-40ad0-default-rtdb.firebaseio.com/quotes.json",
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: titleValue,
          quote: quoteValue,
          comments: JSON.stringify([])
        }),
      }, transformData)
      
      navigate("/");
    } else {
      return
    }
    
    resetTitleInput();
    resetQuoteInput();
 }
  
  
  return (
    <div>
      <form className="center flex-col" onSubmit={handleFormSubmit}>
        <input className={!titleHasError ? "input" : "input-error"} value={titleValue} onChange={changeTitleValueHandler} onBlur={blurTitleInputHandler} placeholder="author"/>
        { titleHasError && <p className="text-red-500">Author input cannot be empty!</p>}
        <textarea className={!quoteHasError ? "input" : "input-error"} value={quoteValue} onChange={changeQuoteValueHandler} onBlur={blurQuoteInputHandler} placeholder="quote"></textarea>
        { quoteHasError && <p className="text-red-500">Quote input cannot be empty!</p>}
        <Button colorClass="bg-green-500">Create</Button>
      </form>
    </div>
    )
}