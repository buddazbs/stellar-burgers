import { combineReducers } from '@reduxjs/toolkit';

import constructor from './constructorSlice';
import orders from './ordersSlice';
import auth from './authSlice';
import ingredients from './ingredientsSlice';
import feeds from './feedSlice';
import user from './userSlice';
import profileOrders from './profileOrdersSlice';
import orderDetails from './orderDetailsSlice';
import ingredientModal from './ingredientModalSlice';
import orderModal from './orderModalSlice';

const rootReducer = combineReducers({
  constructor,
  orders,
  auth,
  ingredients,
  feeds,
  user,
  profileOrders,
  orderDetails,
  ingredientModal,
  orderModal
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
