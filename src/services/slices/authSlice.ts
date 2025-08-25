import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';
import { TUser } from '@utils-types';

export interface AuthState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false
};

export const login = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(data);
    return res.user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка авторизации');
  }
});

export const register = createAsyncThunk<
  TUser,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await registerUserApi(data);
    return res.user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка регистрации');
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка выхода');
    }
  }
);

export const forgotPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>('auth/forgotPassword', async (data, { rejectWithValue }) => {
  try {
    await forgotPasswordApi(data);
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка восстановления пароля');
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string },
  { rejectValue: string }
>('auth/resetPassword', async (data, { rejectWithValue }) => {
  try {
    await resetPasswordApi(data);
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка сброса пароля');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state: AuthState, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isAuth = true;
          state.loading = false;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка авторизации';
      })
      .addCase(register.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state: AuthState, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isAuth = true;
          state.loading = false;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка регистрации';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state: AuthState) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Ошибка восстановления пароля';
      })
      .addCase(resetPassword.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state: AuthState) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка сброса пароля';
      });
  }
});

export default authSlice.reducer;
