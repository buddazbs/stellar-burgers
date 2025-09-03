import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { RootState } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useAppSelector(
    (state: RootState) => state.feeds
  );

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, orders.length]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading) return <Preloader />;
  if (error)
    return <div className='text text_type_main-medium mt-10'>{error}</div>;

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
