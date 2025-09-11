import reducer, {
  login,
  register,
  forgotPassword,
  resetPassword,
  resetForgotPasswordSuccess,
  logout
} from '../services/slices/authSlice';
import { TUser } from '../utils/types';

describe('authSlice', () => {
  const user: TUser = { email: 'test@example.com', name: 'Tester' };

  it('login: ожидание', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: login.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('login: успех', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: login.fulfilled.type, payload: user });
    expect(next.loading).toBe(false);
    expect(next.user).toEqual(user);
    expect(next.isAuth).toBe(true);
  });

  it('login: ошибка', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const error = 'Ошибка авторизации';
    const next = reducer(start, { type: login.rejected.type, payload: error });
    expect(next.loading).toBe(false);
    expect(next.error).toBe(error);
  });

  it('register: успех', () => {
    const start = reducer(undefined, { type: register.pending.type });
    const next = reducer(start, {
      type: register.fulfilled.type,
      payload: user
    });
    expect(next.user).toEqual(user);
    expect(next.isAuth).toBe(true);
    expect(next.loading).toBe(false);
  });

  it('forgotPassword: сценарий', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const pending = reducer(start, { type: forgotPassword.pending.type });
    expect(pending.loading).toBe(true);
    expect(pending.error).toBeNull();
    expect(pending.forgotPasswordSuccess).toBe(false);

    const fulfilled = reducer(pending, { type: forgotPassword.fulfilled.type });
    expect(fulfilled.loading).toBe(false);
    expect(fulfilled.forgotPasswordSuccess).toBe(true);

    const rejected = reducer(start, {
      type: forgotPassword.rejected.type,
      payload: 'Ошибка восстановления пароля'
    });
    expect(rejected.loading).toBe(false);
    expect(rejected.error).toBe('Ошибка восстановления пароля');
    expect(rejected.forgotPasswordSuccess).toBe(false);
  });

  it('resetPassword: не обрабатывается', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const pending = reducer(start, { type: resetPassword.pending.type });
    expect(pending).toEqual(start);
    const rejected = reducer(start, {
      type: resetPassword.rejected.type,
      payload: 'Ошибка сброса пароля'
    });
    expect(rejected).toEqual(start);
  });

  it('сбрасывает флаг восстановления', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const withSuccess = { ...start, forgotPasswordSuccess: true } as any;
    const next = reducer(withSuccess, resetForgotPasswordSuccess());
    expect(next.forgotPasswordSuccess).toBe(false);
  });

  it('выход', () => {
    const start = reducer(undefined, {
      type: login.fulfilled.type,
      payload: user
    });
    const next = reducer(start, logout());
    expect(next.user).toBeNull();
    expect(next.isAuth).toBe(false);
    expect(next.loading).toBe(false);
    expect(next.error).toBeNull();
  });
});
