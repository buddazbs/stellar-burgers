import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import authReducer from './slices/authSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import feedsReducer from './slices/feedSlice';
import ordersReducer from './slices/ordersSlice';
import constructorReducer from './slices/constructorSlice';
import userReducer from './slices/userSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import ingredientModalReducer from './slices/ingredientModalSlice';
import orderModalReducer from './slices/orderModalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ingredients: ingredientsReducer,
    feeds: feedsReducer,
    orders: ordersReducer,
    user: userReducer,
    burgerConstructor: constructorReducer,
    profileOrders: profileOrdersReducer,
    orderDetails: orderDetailsReducer,
    ingredientModal: ingredientModalReducer,
    orderModal: orderModalReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
