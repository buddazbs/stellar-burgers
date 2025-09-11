import reducer, {
  fetchOrderByNumber,
  clearCurrentOrder
} from '../services/slices/orderDetailsSlice';
import { TOrder } from '../utils/types';

describe('orderDetailsSlice', () => {
  const order: TOrder = {
    _id: 'o1',
    status: 'done',
    name: 'Order 1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 101,
    ingredients: ['a', 'b']
  };

  it('ожидание', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: fetchOrderByNumber.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('успех', () => {
    const start = reducer(undefined, { type: fetchOrderByNumber.pending.type });
    const next = reducer(start, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: order
    });
    expect(next.isLoading).toBe(false);
    expect(next.currentOrder).toEqual(order);
  });

  it('ошибка', () => {
    const start = reducer(undefined, { type: fetchOrderByNumber.pending.type });
    const msg = 'Ошибка получения заказа';
    const next = reducer(start, {
      type: fetchOrderByNumber.rejected.type,
      payload: msg
    });
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(msg);
  });

  it('очищение текущего заказа', () => {
    const start = reducer(undefined, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: order
    });
    const next = reducer(start, clearCurrentOrder());
    expect(next.currentOrder).toBeNull();
    expect(next.error).toBeNull();
  });
});
