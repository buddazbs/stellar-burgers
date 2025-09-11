import reducer, { fetchFeeds } from '../services/slices/feedSlice';
import { TOrder } from '../utils/types';

describe('feedSlice', () => {
  const payload = {
    orders: [
      {
        _id: 'o1',
        status: 'done',
        name: 'Order 1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        number: 101,
        ingredients: ['a', 'b']
      } as TOrder
    ],
    total: 1000,
    totalToday: 50
  };

  it('ожидание', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: fetchFeeds.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('успех', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: fetchFeeds.fulfilled.type, payload });
    expect(next.isLoading).toBe(false);
    expect(next.orders).toEqual(payload.orders);
    expect(next.total).toBe(payload.total);
    expect(next.totalToday).toBe(payload.totalToday);
  });

  it('ошибка', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const msg = 'Ошибка загрузки ленты';
    const next = reducer(start, {
      type: fetchFeeds.rejected.type,
      payload: msg
    });
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(msg);
  });
});
