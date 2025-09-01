import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

export type OrderModalState = {
  isOpen: boolean;
  order: TOrder | null;
};

const initialState: OrderModalState = {
  isOpen: false,
  order: null
};

const orderModalSlice = createSlice({
  name: 'orderModal',
  initialState,
  reducers: {
    openOrderModal: (state, action: PayloadAction<TOrder>) => {
      state.isOpen = true;
      state.order = action.payload;
    },
    closeOrderModal: (state) => {
      state.isOpen = false;
      state.order = null;
    }
  }
});

export const { openOrderModal, closeOrderModal } = orderModalSlice.actions;
export default orderModalSlice.reducer;
