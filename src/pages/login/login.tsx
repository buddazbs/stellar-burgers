import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { login } from '../../services/slices/authSlice';
import { fetchUser } from '../../services/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);
  const from = (location.state as any)?.from || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      await dispatch(fetchUser());
      navigate(from, { replace: true });
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};
