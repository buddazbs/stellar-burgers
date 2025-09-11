import reducer, {
  fetchProfileOrders
} from '../services/slices/profileOrdersSlice';
import { TOrder } from '../utils/types';

describe('profileOrdersSlice', () => {
  const orders: TOrder[] = [
    {
      _id: 'o1',
      status: 'done',
      name: 'Order 1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: 101,
      ingredients: ['a']
    },
    {
      _id: 'o2',
      status: 'created',
      name: 'Order 2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: 102,
      ingredients: ['b']
    }
  ];

  it('pending -> isLoading=true, error=null', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: fetchProfileOrders.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('fulfilled -> sets orders and isLoading=false', () => {
    const start = reducer(undefined, { type: fetchProfileOrders.pending.type });
    const next = reducer(start, {
      type: fetchProfileOrders.fulfilled.type,
      payload: orders
    });
    expect(next.isLoading).toBe(false);
    expect(next.orders).toEqual(orders);
  });

  it('rejected -> isLoading=false, error set', () => {
    const start = reducer(undefined, { type: fetchProfileOrders.pending.type });
    const msg = 'Ошибка загрузки';
    const next = reducer(start, {
      type: fetchProfileOrders.rejected.type,
      payload: msg
    });
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(msg);
  });
});
