import { useAppSelector, useAppDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';
import type { RootState } from '../../services/store';

import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const orders = useAppSelector(
    (state: RootState) => state.profileOrders.orders
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.profileOrders.isLoading
  );
  const dispatch = useAppDispatch();
  const error = useAppSelector((state: RootState) => state.profileOrders.error);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchProfileOrders());
    }
  }, [dispatch, orders.length]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error)
    return <div className='text text_type_main-medium mt-10'>{error}</div>;

  return <ProfileOrdersUI orders={orders} />;
};
