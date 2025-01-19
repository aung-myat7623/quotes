import React, { lazy, Suspense } from "react";

import { useEffect } from "react";

import { Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { useDispatch } from "react-redux";

import { uiActions } from "./store/ui.js";

import useHttp from "./hooks/useHttp";

import { quoteLoaderFn } from "./pages/QuoteDetailPage";

import Comments from "./components/Comments";
import Loading from "./components/Loading";

import MainLayout from "./layout/MainLayout";

//const MainLayout = lazy(() => import("./layout/MainLayout"));
const QuotesPage = lazy(() => import("./pages/QuotesPage"));
const NewQuotePage = lazy(() => import("./pages/NewQuotePage"));
const EditQuotePage = lazy(() => import("./pages/EditQuotePage"));
const QuoteDetailPage = lazy(() => import("./pages/QuoteDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const Layout = ({children}) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
    )
}

export default function App() {
  const dispatch = useDispatch();
  
  const { sendRequest, loading } = useHttp();
  
  const transformData = (quotes) => {
    const newQuotesArray = [];
    
    for ( let key in quotes) {
      newQuotesArray.push({
        id: key,
        title: quotes[key].title,
        quote: quotes[key].quote
      })
    }
    
    
    dispatch(uiActions.replaceQuotes(newQuotesArray))
  }
  
  useEffect(() => {
    sendRequest({
      url: "https://react-http-40ad0-default-rtdb.firebaseio.com/quotes.json"
    }, transformData)
  }, [sendRequest])
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Layout><Navigate to="/quotes" /></Layout>} />
      <Route path="/quotes" element={<Layout><QuotesPage loading={loading} /></Layout>} />
      <Route path="/quotes/:id/" element={<Layout><QuoteDetailPage /></Layout>} loader={quoteLoaderFn} >
        <Route path="comments" element={<Layout><Comments /></Layout>} loader={quoteLoaderFn} />
      </Route>
      <Route path="/new-quote" element={<Layout><NewQuotePage /></Layout>} />
      <Route path="/edit-quote/:id" element={<Layout><EditQuotePage /></Layout>} loader={quoteLoaderFn} />
      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Route>
  ))
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}