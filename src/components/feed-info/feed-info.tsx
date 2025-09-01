import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { FeedInfoUI } from '@ui';
import type { RootState } from '../../services/store';

export const FeedInfo: FC = () => {
  const { total, totalToday, orders } = useAppSelector(
    (state: RootState) => state.feeds
  );

  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number);

  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number);

  return (
    <FeedInfoUI
      feed={{ total, totalToday }}
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
    />
  );
};
