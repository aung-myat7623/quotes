import { useEffect, useState } from "react"

import { Link, Outlet, useParams, useLoaderData } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import useHttp from "../hooks/useHttp";

import Button from "../components/Button";
import Comments from "../components/Comments";

export default function QuoteDetailPage() {
  const quote = useLoaderData()
  
  
  
  return (
    <section className="mt-2 p-2 flex flex-col">
      <h3 className="min-h-[100px]">
        <i className="fa-solid fa-quote-left text-4xl mr-3"></i>
        <span className="font-quicksand font-bold">{quote.quote}</span>
      </h3>
      <p className="text-right font-bold">Written by {quote.title}</p>
      <div className="center my-2">
        <Link to="comments" className="btn bg-green-500 max-w-[100px]">Comments</Link>
      </div>
      <Outlet />
    </section>
    )
}

export const quoteLoaderFn = async ({params}) => {
  const { id } = params
  
  const res = await fetch(`https://react-http-40ad0-default-rtdb.firebaseio.com/quotes/${id}.json`)
  const data = await res.json();
  
  return {
    id: id,
    title: data.title,
    quote: data.quote,
    comments: data.comments
  }
}