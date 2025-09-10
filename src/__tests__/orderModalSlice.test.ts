import reducer, {
  openOrderModal,
  closeOrderModal
} from '../services/slices/orderModalSlice';
import { TOrder } from '../utils/types';

describe('orderModalSlice', () => {
  const order: TOrder = {
    _id: 'o1',
    status: 'done',
    name: 'Order 1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 101,
    ingredients: ['a', 'b']
  };

  it('открывает', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, openOrderModal(order));
    expect(next.isOpen).toBe(true);
    expect(next.order).toEqual(order);
  });

  it('закрывает', () => {
    const opened = reducer(undefined, openOrderModal(order));
    const closed = reducer(opened, closeOrderModal());
    expect(closed.isOpen).toBe(false);
    expect(closed.order).toBeNull();
  });
});
