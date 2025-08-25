import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import feedsReducer from './slices/feedSlice';
import ordersReducer from './slices/ordersSlice';
import constructorReducer from './slices/constructorSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ingredients: ingredientsReducer,
    feeds: feedsReducer,
    orders: ordersReducer,
    user: userReducer,
    burgerConstructor: constructorReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
