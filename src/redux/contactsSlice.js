import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, deleteContact } from './operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContacts.pending](state, action) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.error = action.payload;
    },
    [deleteContact.fulfilled](state, action) {
      state.error = null;
      // const index = state.items.findIndex(
      //   contact => contact.id === action.payload.id
      // );
      // state.items.splice(index, 1);
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      );
    },
    [deleteContact.rejected](state, action) {
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
