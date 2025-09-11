import reducer, {
  fetchUser,
  updateUser,
  logout,
  setForm,
  resetForm
} from '../services/slices/userSlice';
import { TUser } from '../utils/types';

describe('userSlice', () => {
  const user: TUser = { email: 'test@example.com', name: 'Tester' };
  const updatedUser: TUser = { email: 'new@example.com', name: 'New Name' };

  it('fetchUser: pending', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const next = reducer(start, { type: fetchUser.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('fetchUser: успех', () => {
    const start = reducer(undefined, { type: fetchUser.pending.type });
    const next = reducer(start, {
      type: fetchUser.fulfilled.type,
      payload: user
    });
    expect(next.user).toEqual(user);
    expect(next.form).toEqual(user);
    expect(next.isAuthChecked).toBe(true);
    expect(next.isEdited).toBe(false);
    expect(next.isLoading).toBe(false);
  });

  it('fetchUser: ошибка', () => {
    const start = reducer(undefined, { type: fetchUser.pending.type });
    const msg = 'Ошибка загрузки пользователя';
    const next = reducer(start, {
      type: fetchUser.rejected.type,
      payload: msg
    });
    expect(next.error).toBe(msg);
    expect(next.isAuthChecked).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('updateUser: флоу', () => {
    const start = reducer(undefined, { type: '@@INIT' } as any);
    const pending = reducer(start, { type: updateUser.pending.type });
    expect(pending.isLoading).toBe(true);
    expect(pending.error).toBeNull();

    const fulfilled = reducer(pending, {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    });
    expect(fulfilled.user).toEqual(updatedUser);
    expect(fulfilled.form).toEqual(updatedUser);
    expect(fulfilled.isEdited).toBe(false);
    expect(fulfilled.isLoading).toBe(false);

    const rejected = reducer(start, {
      type: updateUser.rejected.type,
      payload: 'Ошибка обновления пользователя'
    });
    expect(rejected.error).toBe('Ошибка обновления пользователя');
    expect(rejected.isLoading).toBe(false);
  });

  it('setForm/resetForm', () => {
    const start = reducer(undefined, {
      type: fetchUser.fulfilled.type,
      payload: user
    });
    const editedForm = { email: 'x@y.z', name: 'X' } as TUser;
    const withForm = reducer(start, setForm(editedForm));
    expect(withForm.form).toEqual(editedForm);
    expect(withForm.isEdited).toBe(true);

    const reset = reducer(withForm, resetForm());
    expect(reset.form).toEqual(reset.user);
    expect(reset.isEdited).toBe(false);
  });

  it('logout', () => {
    const start = reducer(undefined, {
      type: fetchUser.fulfilled.type,
      payload: user
    });
    const next = reducer(start, { type: logout.fulfilled.type });
    expect(next.user).toBeNull();
    expect(next.form).toBeNull();
    expect(next.isEdited).toBe(false);
    expect(next.error).toBeNull();
  });
});
