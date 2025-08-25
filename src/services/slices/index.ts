import { combineReducers } from '@reduxjs/toolkit';

import constructor from './constructorSlice';
import orders from './ordersSlice';
import auth from './authSlice';

const rootReducer = combineReducers({
  constructor,
  orders,
  auth
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
