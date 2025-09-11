import reducer, {
  openIngredientModal,
  closeIngredientModal
} from '../services/slices/ingredientModalSlice';
import { TIngredient } from '../utils/types';

describe('ingredientModalSlice', () => {
  const ingredient: TIngredient = {
    _id: 'i1',
    name: 'Ингредиент',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 10,
    price: 5,
    image: 'img',
    image_large: 'img_l',
    image_mobile: 'img_m'
  };

  it('открытие модалки', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, openIngredientModal(ingredient));
    expect(next.isOpen).toBe(true);
    expect(next.ingredient).toEqual(ingredient);
  });

  it('закрытие модалку', () => {
    const opened = reducer(undefined, openIngredientModal(ingredient));
    const closed = reducer(opened, closeIngredientModal());
    expect(closed.isOpen).toBe(false);
    expect(closed.ingredient).toBeNull();
  });
});
