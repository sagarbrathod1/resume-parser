import { configureStore } from '@reduxjs/toolkit';
import document_reducer from '../features/counter/document_slice';

export const store = configureStore({
  reducer: {
    document: document_reducer,
  },
});
