import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice'
import catSlice from '../features/category/catSlice';
import  prodSlice  from '../features/product/prodSlice';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    category:catSlice,
    product:prodSlice
  },
});