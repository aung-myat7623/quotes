import { useSelector } from "react-redux";

import QuotesList from "../components/QuotesList";

export default function QuotesPage({loading}) {
  const quotes = useSelector(state => state.ui.quotes);
  
  return (
    <div>
      {//loading && <p className="text-center my-5 font-bold text-green-500">Loading...</p> }
      }
      { (quotes.length > 0 && !loading ) && <QuotesList quotes={quotes} /> }
      { (quotes.length === 0 && !loading ) && <p className="text-center my-5 text-green-500 font-bold">There is no quote yet!</p> }
    </div>
    )
}