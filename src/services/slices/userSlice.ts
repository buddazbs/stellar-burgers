import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi, logoutApi } from '@api';
import { TUser } from '@utils-types';
import { deleteCookie } from '../../utils/cookie';

export type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  isEdited: boolean;
  form: TUser | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  error: null,
  isEdited: false,
  form: null,
  isLoading: false
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Ошибка загрузки пользователя');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TUser, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(data);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || 'Ошибка обновления пользователя'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return null;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Ошибка выхода');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setForm(state, action: PayloadAction<TUser>) {
      state.form = action.payload;
      state.isEdited = true;
    },
    resetForm(state) {
      state.form = state.user;
      state.isEdited = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.form = action.payload;
        state.isAuthChecked = true;
        state.isEdited = false;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error =
          (action.payload as string) || 'Ошибка загрузки пользователя';
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.form = action.payload;
        state.isEdited = false;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error =
          (action.payload as string) || 'Ошибка обновления пользователя';
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.form = null;
        state.isEdited = false;
        state.error = null;
      });
  }
});

export const { setForm, resetForm } = userSlice.actions;
export default userSlice.reducer;
