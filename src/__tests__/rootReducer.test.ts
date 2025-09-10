import rootReducer from '../services/slices';

describe('rootReducer', () => {
  it('инициализируется корректно', () => {
    const state = rootReducer(undefined, { type: '@@INIT' } as any);
    expect(state).toBeTruthy();
    expect(state).toHaveProperty('constructor');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('profileOrders');
    expect(state).toHaveProperty('orderDetails');
    expect(state).toHaveProperty('ingredientModal');
    expect(state).toHaveProperty('orderModal');
  });
});
