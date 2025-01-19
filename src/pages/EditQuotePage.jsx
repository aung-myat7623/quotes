import { useNavigate, useLoaderData } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui.js";

import useInput from "../hooks/useInput";
import useHttp from "../hooks/useHttp";

import Button from "../components/Button";

const isNotEmpty = (value) => value.length !== 0;

export default function NewQuotePage() {
  const dispatch = useDispatch()
  
  // const quote = useSelector(state => state.ui.editingQuote);
  const quote = useLoaderData()
  
  const { sendRequest, loading } = useHttp();
  
  const navigate = useNavigate()
  const { inputValue: titleValue, hasError: titleHasError, isInputValid: isTitleInputValid, isValueValid: isTitleValueValid, changeValueHandler: changeTitleValueHandler, blurInputHandler: blurTitleInputHandler, resetInput: resetTitleInput } = useInput(isNotEmpty);
  const { inputValue: quoteValue, hasError: quoteHasError, isInputValid: isQuoteInputValid, isValueValid: isQuoteValueValid, changeValueHandler: changeQuoteValueHandler, blurInputHandler: blurQuoteInputHandler, resetInput: resetQuoteInput } = useInput(isNotEmpty);
 
  const transformData = (data) => {
    dispatch(uiActions.editQuote({
      id: quote.id,
      title: titleValue,
      quote: quoteValue
    }))
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    if (!titleHasError && isTitleInputValid && !quoteHasError && isQuoteInputValid) {
      sendRequest({
        url: `https://react-http-40ad0-default-rtdb.firebaseio.com/quotes/${quote.id}.json`,
        method: "PATCH",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: titleValue,
          quote: quoteValue
        }),
      }, transformData)
      
      navigate("/");
    } else {
      return
    }
    
    resetTitleInput();
    resetQuoteInput();
    
    dispatch(uiActions.resetEditingQuote(null))
 }
  
  const handleCreateQuote = () => {
    
  }
  
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="center flex-col">
        <input className={!titleHasError ? "input" : "input-error"} value={titleValue} onChange={changeTitleValueHandler} onBlur={blurTitleInputHandler} placeholder={"author - " + quote.title}/>
        { titleHasError && <p className="text-red-500">Title input cannot be empty!</p>}
        <textarea className={!quoteHasError ? "input" : "input-error"} value={quoteValue} onChange={changeQuoteValueHandler} onBlur={blurQuoteInputHandler} placeholder={"quote - " +quote.quote}></textarea>
        { quoteHasError && <p className="text-red-500">Quote input cannot be empty!</p>}
        <Button onClick={handleCreateQuote} colorClass="bg-blue-500">Edit</Button>
      </form>
    </div>
    )
}