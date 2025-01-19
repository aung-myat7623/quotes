import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui";

import useHttp from "../hooks/useHttp";

import Button from "./Button";

export default function QuotesList({quotes}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //const editingQuote = useSelector(state => state.ui.editingQuote)
  
  const { sendRequest, loading } = useHttp();
  
  const transformData = (id, data) => {
    dispatch(uiActions.deleteQuote(id))
  }
  
  const deleteQuote = (id) => {
    const confirmationText = "Do you want to delete this quote?";
    
    if (confirm(confirmationText)) {
      sendRequest({
        url: `https://react-http-40ad0-default-rtdb.firebaseio.com/quotes/${id}.json`,
        method: "DELETE"
      }, transformData.bind(null, id))
    } else {
      return
    }
    
  }
  
  const editQuote = (quote) => {
    //dispatch(uiActions.setEditingQuote(quote));
    navigate(`/edit-quote/${quote.id}`);
  }
  
  const viewQuoteDetail = (quote) => {
    navigate(`/quotes/${quote.id}`);
  }
  
  return (
    <ul className="center flex-col">
      { quotes.map(quote => {
        return (
          <li key={quote.id} className="my-3">
            <div className="flex flex-col relative bg-stone-100 p-1 min-w-[300px] max-w-[300px] min-h-[150px] rounded-tl-lg rounded-tr-lg">
              
              <h2 className="">
                <i className="fa-solid fa-quote-left text-4xl mr-3"></i>
                <span className="font-quicksand font-bold">{quote.quote}</span>
              </h2>
              <p className="text-right absolute bottom-0 right-2 font-bold">By {quote.title}</p>
            </div>
            <div className="flex bg-zinc-900 w-full rounded-bl-lg rounded-br-lg">
              <Button colorClass="bg-green-500" addClass="grow" onClick={() => viewQuoteDetail(quote) }>View</Button>
              <Button colorClass="bg-blue-500" addClass="grow" onClick={() => editQuote(quote)}>Edit</Button>
              <Button colorClass="bg-red-500" addClass="grow" onClick={() => deleteQuote(quote.id)}>Delete</Button>
            </div>
          </li>
        )
      })}
    </ul>
    )
}