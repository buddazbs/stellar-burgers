import { FC, useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import type { RootState } from '../../services/store';
import { closeOrderModal } from '../../services/slices/orderModalSlice';
import { ModalUI } from '../ui/modal';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '../../utils/types';
import {
  fetchOrderByNumber,
  clearCurrentOrder
} from '../../services/slices/orderDetailsSlice';
import { useModalNavigation } from '../../hooks/useModalNavigation';
import { useLocation, useParams } from 'react-router-dom';

export const OrderModal: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();
  const { isOpen } = useAppSelector((state: RootState) => state.orderModal);
  const orderData = useAppSelector(
    (state: RootState) => state.orderDetails.currentOrder
  );
  const ingredients: TIngredient[] = useAppSelector(
    (state: RootState) => state.ingredients.items
  );
  const { handleModalClose } = useModalNavigation();

  const shouldShowModal = isOpen;

  useEffect(() => {
    if (shouldShowModal && number && !orderData) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, shouldShowModal, number, orderData]);

  const handleClose = () => {
    dispatch(closeOrderModal());
    dispatch(clearCurrentOrder());
    handleModalClose();
  };

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = acc[item]
            ? { ...acc[item], count: acc[item].count + 1 }
            : { ...ingredient, count: 1 };
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!shouldShowModal || !orderData || !orderInfo) return null;

  return (
    <ModalUI
      title={`#${String(orderData.number).padStart(6, '0')}`}
      onClose={handleClose}
    >
      <OrderInfoUI orderInfo={orderInfo} />
    </ModalUI>
  );
};
