import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

export type IngredientModalState = {
  isOpen: boolean;
  ingredient: TIngredient | null;
};

const initialState: IngredientModalState = {
  isOpen: false,
  ingredient: null
};

const ingredientModalSlice = createSlice({
  name: 'ingredientModal',
  initialState,
  reducers: {
    openIngredientModal: (state, action: PayloadAction<TIngredient>) => {
      state.isOpen = true;
      state.ingredient = action.payload;
    },
    closeIngredientModal: (state) => {
      state.isOpen = false;
      state.ingredient = null;
    }
  }
});

export const { openIngredientModal, closeIngredientModal } =
  ingredientModalSlice.actions;
export default ingredientModalSlice.reducer;
