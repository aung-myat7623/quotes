import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    validForm: false,
    isTouched: false,
    showComments: false,
    quotes: [],
  },
  reducers: {
    activeTouch(state, action) {
      state.isTouched = action.payload;
    },
    changeValidity(state, action) {
      state.validForm = action.payload;
    },
    replaceQuotes(state, action) {
      state.quotes = action.payload;
    },
    addQuote(state, action) {
      state.quotes.push(action.payload)
    },
    deleteQuote(state, action) {
      state.quotes = state.quotes.filter(quote => quote.id !== action.payload)
    },
    editQuote(state, action) {
      const remainingQuote = state.quotes.filter(quote => quote.id !== action.payload.id);
      
      state.quotes = [...remainingQuote, action.payload]
    },
    addComment(state, action) {
      state.quotes.find(quote => quote.id === action.payload.quoteId).comments.shift({
        id: action.payload.id,
        comment: action.payload.comment
      });
    },
    commentToggler(state, action) {
      state.showComments = !state.showComments;
    }
    
  }
})

export const uiActions = uiSlice.actions;
export default uiSlice;