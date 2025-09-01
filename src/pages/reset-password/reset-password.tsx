import { FC, SyntheticEvent, useState } from 'react';
import { ResetPasswordUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetPassword } from '../../services/slices/authSlice';
import { RootState } from '../../services/store';

export const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token }));
  };

  return (
    <ResetPasswordUI
      errorText={error || ''}
      password={password}
      setPassword={setPassword}
      token={token}
      setToken={setToken}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};
