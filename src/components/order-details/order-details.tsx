import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '../../utils/types';
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { fetchOrderByNumber } from '../../services/slices/orderDetailsSlice';
import { NotFound404 } from '../../pages/not-fount-404';
import { OrderModal } from '../order-modal';
import styles from '../app/app.module.css';

export const OrderDetails: FC = () => {
  const { number } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orderData = useAppSelector(
    (state: RootState) => state.orderDetails.currentOrder
  );
  const { isLoading, error } = useAppSelector(
    (state: RootState) => state.orderDetails
  );
  const ingredients: TIngredient[] = useAppSelector(
    (state: RootState) => state.ingredients.items
  );

  useEffect(() => {
    if (number) dispatch(fetchOrderByNumber(Number(number)));
  }, [dispatch, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (location.state?.background) {
    return <OrderModal />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  if (error || !orderData) {
    return <NotFound404 />;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <h1 className={`text text_type_main-large ${styles.detailHeader}`}>
        #{String(orderData.number).padStart(6, '0')}
      </h1>
      <OrderInfoUI orderInfo={orderInfo} />
    </div>
  );
};
