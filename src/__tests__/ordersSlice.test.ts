import reducer, {
  createOrder,
  closeOrderModal
} from '../services/slices/ordersSlice';
import { TOrder } from '../utils/types';

describe('ordersSlice', () => {
  const order: TOrder = {
    _id: 'order1',
    status: 'done',
    name: 'Test Order',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 12345,
    ingredients: ['a', 'b']
  };

  it('ожидание', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: createOrder.pending.type });
    expect(next.orderRequest).toBe(true);
    expect(next.error).toBeNull();
  });

  it('успех', () => {
    const start = reducer(undefined, { type: createOrder.pending.type });
    const next = reducer(start, {
      type: createOrder.fulfilled.type,
      payload: order
    });
    expect(next.orderRequest).toBe(false);
    expect(next.orderModalData).toEqual(order);
  });

  it('ошибка', () => {
    const start = reducer(undefined, { type: createOrder.pending.type });
    const msg = 'Ошибка оформления заказа';
    const next = reducer(start, {
      type: createOrder.rejected.type,
      payload: msg
    });
    expect(next.orderRequest).toBe(false);
    expect(next.error).toBe(msg);
  });

  it('закрывает модалку', () => {
    const start = reducer(undefined, {
      type: createOrder.fulfilled.type,
      payload: order
    });
    const next = reducer(start, closeOrderModal());
    expect(next.orderModalData).toBeNull();
    expect(next.error).toBeNull();
  });
});
