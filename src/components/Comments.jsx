import { useRef, useEffect, useState } from "react";

import { useParams, useLoaderData } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import useHttp from "../hooks/useHttp";

import { uiActions } from "../store/ui.js";

import Button from "./Button";
import CommentsList from "./CommentsList"

export default function Comments() {
  
  const { id } = useParams();
  
  const commentRef = useRef("");
  
  const dispatch = useDispatch();
  
  // const commentsFromRedux = useSelector(state => state.ui.comments)
  
  //const [comments, setComments] = useState([])
  
  const { sendRequest, loading } = useHttp();
  
  let quote = useLoaderData();
  let commentsFromFB = JSON.parse(quote.comments)
  
  const [comments, setComments] = useState(commentsFromFB)
  
  const transformPostData = (data) => {
    dispatch(uiActions.addComment({
      id: data.name,
      quoteId: id,
      comment: commentRef.current.value,
    }))
  }
  
  const submitCommentHandler = (e) => {
    e.preventDefault();
    
    
    if (commentRef.length !== 0) {
      const updatedComments = [...comments];
      updatedComments.unshift({
        id: Math.random(),
        comment: commentRef.current.value
      })
      
      setComments(updatedComments)
      
      console.log(updatedComments)
      sendRequest({
        url: `https://react-http-40ad0-default-rtdb.firebaseio.com/quotes/${id}.json`,
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: JSON.stringify(updatedComments)
        })
      }, transformPostData)
    } else {
      alert("You can't comment empty text!")
      return
    }
    
    commentRef.current.value = ""
  }
  
  return (
    <section className="mt-3">
      <form onSubmit={submitCommentHandler} className="center">
        <input ref={commentRef} className="input" type="text" placeholder="what is your thought?"/>
        <Button colorClass="bg-blue-500">Post</Button>
      </form>
      { comments.length > 0 && <CommentsList comments={comments} />}
    </section>
    )
}