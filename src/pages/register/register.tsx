import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { register } from '../../services/slices/authSlice';
import { RootState } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      userName={userName}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};
