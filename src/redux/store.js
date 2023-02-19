import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { filterSlice } from 'redux/filterSlice';
import { contactsReducer } from 'redux/contactsSlice';

const commonReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: commonReducer,
});
