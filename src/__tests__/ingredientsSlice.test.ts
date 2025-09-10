import reducer, {
  fetchIngredients,
  setIngredients
} from '../services/slices/ingredientsSlice';
import { TIngredient } from '../utils/types';

const ingredients: TIngredient[] = [
  {
    _id: 'bun1',
    name: 'Булка 1',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'img',
    image_large: 'img_l',
    image_mobile: 'img_m'
  },
  {
    _id: 'main1',
    name: 'Котлета',
    type: 'main',
    proteins: 25,
    fat: 20,
    carbohydrates: 5,
    calories: 300,
    price: 200,
    image: 'img',
    image_large: 'img_l',
    image_mobile: 'img_m'
  }
];

describe('ingredientsSlice', () => {
  it('ожидание', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: fetchIngredients.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('успех', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });
    expect(next.isLoading).toBe(false);
    expect(next.items).toEqual(ingredients);
  });

  it('ошибка', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const errorMessage = 'Ошибка загрузки';
    const next = reducer(start, {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    });
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(errorMessage);
  });
});
