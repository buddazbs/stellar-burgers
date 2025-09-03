import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import type { RootState } from '../store';

export type OrderState = {
  orders: TOrder[];
  isLoading: boolean;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    return [];
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка получения заказов');
  }
});

type TNewOrderResponse = {
  success: boolean;
  order: TOrder;
  name: string;
};

export const createOrder = createAsyncThunk<
  TOrder,
  void,
  { state: RootState; rejectValue: string }
>('order/createOrder', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const bunId = state.burgerConstructor.bun?._id;
    const ingredientsIds = state.burgerConstructor.ingredients.map(
      (i: { _id: string }) => i._id
    );
    if (!bunId) {
      return rejectWithValue('Булка не выбрана');
    }
    const payloadIds = [bunId, ...ingredientsIds, bunId];
    const res: TNewOrderResponse = await orderBurgerApi(payloadIds);
    return res.order;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка оформления заказа');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = (action.payload as string) || 'Ошибка оформления заказа';
      });
  }
});

export const { closeOrderModal } = ordersSlice.actions;

export const selectOrderRequest = (state: RootState) =>
  state.orders.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.orders.orderModalData;
export const selectOrderError = (state: RootState) => state.orders.error;

export default ordersSlice.reducer;
