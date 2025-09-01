import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export interface AuthState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
  forgotPasswordSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
  forgotPasswordSuccess: false
};

export const login = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
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
  reducers: {
    resetForgotPasswordSuccess(state) {
      state.forgotPasswordSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка авторизации';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка регистрации';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Ошибка восстановления пароля';
        state.forgotPasswordSuccess = false;
      });
  }
});

export const { resetForgotPasswordSuccess } = authSlice.actions;
export default authSlice.reducer;
