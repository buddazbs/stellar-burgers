import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const newArr = [...state.ingredients];
        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
        state.ingredients = newArr;
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const newArr = [...state.ingredients];
        [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
        state.ingredients = newArr;
      }
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const setBunWithId = (ingredient: TIngredient) =>
  constructorSlice.actions.setBun({ ...ingredient, id: nanoid() });

export const addIngredientWithId = (ingredient: TIngredient) =>
  constructorSlice.actions.addIngredient({ ...ingredient, id: nanoid() });

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
