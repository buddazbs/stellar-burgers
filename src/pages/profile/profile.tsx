import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { RootState } from '../../services/store';
import {
  fetchUser,
  updateUser,
  setForm,
  resetForm
} from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state: RootState) => state.auth);
  const { form, isEdited, isLoading } = useAppSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error)
    return <div className='text text_type_main-medium mt-10'>{error}</div>;
  if (!form) return null;

  const isFormChanged = isEdited;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetForm());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setForm({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <ProfileUI
      formValue={{
        name: form?.name ?? '',
        email: form?.email ?? '',
        password: form?.password ?? ''
      }}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
