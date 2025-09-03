import { useNavigate } from 'react-router-dom';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  forgotPassword,
  resetForgotPasswordSuccess
} from '../../services/slices/authSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '../../services/store';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, forgotPasswordSuccess } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [email, setEmail] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (forgotPasswordSuccess) {
      navigate('/reset-password', { replace: true });
      dispatch(resetForgotPasswordSuccess());
    }
  }, [forgotPasswordSuccess, navigate, dispatch]);

  return (
    <ForgotPasswordUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};
