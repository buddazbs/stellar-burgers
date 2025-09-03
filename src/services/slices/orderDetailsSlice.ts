import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi } from '../../utils/burger-api';

export type OrderDetailsState = {
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderDetailsState = {
  currentOrder: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'orderDetails/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res.orders[0] || null;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Не удалось получить заказ');
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder | null>) => {
          state.isLoading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка получения заказа';
      });
  }
});

export const { clearCurrentOrder } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
