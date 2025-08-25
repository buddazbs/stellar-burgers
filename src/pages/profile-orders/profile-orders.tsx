import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { fetchOrders } from '../../services/slices/ordersSlice';
import type { RootState } from '../../services/store';

import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const orders = useAppSelector((state: RootState) => state.orders.orders);
  const isLoading = useAppSelector(
    (state: RootState) => state.orders.isLoading
  );
  const dispatch = useAppDispatch();
  const orderModalData = useAppSelector(
    (state: RootState) => state.orders.orderModalData
  );
  const orderRequest = useAppSelector(
    (state: RootState) => state.orders.orderRequest
  );
  const error = useAppSelector((state: RootState) => state.orders.error);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error)
    return <div className='text text_type_main-medium mt-10'>{error}</div>;

  return <ProfileOrdersUI orders={orders} />;
};
