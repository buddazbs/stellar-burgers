import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setBun
} from '../services/slices/constructorSlice';
import { TIngredient } from '../utils/types';

const baseIngredient: TIngredient = {
  _id: 'main1',
  name: 'Котлета',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 200,
  image: 'img',
  image_large: 'img_l',
  image_mobile: 'img_m'
};

const bun: TIngredient = {
  ...baseIngredient,
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  price: 100
};

describe('constructorSlice', () => {
  it('добавление ингридиента', () => {
    const state = reducer(undefined, { type: '@@INIT' } as any);
    const withIngredient = reducer(
      state,
      addIngredient({ ...baseIngredient, id: '1' } as any)
    );
    expect(withIngredient.ingredients).toHaveLength(1);
    expect(withIngredient.ingredients[0]._id).toBe('main1');
  });

  it('удаление ингридиента', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const s1 = reducer(
      start,
      addIngredient({ ...baseIngredient, id: '1' } as any)
    );
    const s2 = reducer(
      s1,
      addIngredient({ ...baseIngredient, id: '2' } as any)
    );
    const s3 = reducer(s2, removeIngredient('1'));
    expect(s3.ingredients.map((i) => i.id)).toEqual(['2']);
  });

  it('меняет порядок ингридиентов', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    let s = start;
    ['1', '2', '3'].forEach((id) => {
      s = reducer(s, addIngredient({ ...baseIngredient, id } as any));
    });
    const moved = reducer(s, moveIngredient({ dragIndex: 0, hoverIndex: 2 }));
    expect(moved.ingredients.map((i) => i.id)).toEqual(['2', '3', '1']);
  });

  it('вверх/вниз', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    let s = start;
    ['1', '2', '3'].forEach((id) => {
      s = reducer(s, addIngredient({ ...baseIngredient, id } as any));
    });
    const up = reducer(s, moveIngredientUp(2));
    expect(up.ingredients.map((i) => i.id)).toEqual(['1', '3', '2']);
    const down = reducer(up, moveIngredientDown(1));
    expect(down.ingredients.map((i) => i.id)).toEqual(['1', '2', '3']);
  });

  it('устанавливает булку', () => {
    const state = reducer(undefined, { type: '@@INIT' } as any);
    const withBun = reducer(state, setBun({ ...bun, id: 'b1' } as any));
    expect(withBun.bun?._id).toBe('bun1');
  });
});
