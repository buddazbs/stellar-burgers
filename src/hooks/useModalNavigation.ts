import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../services/store';
import {
  openIngredientModal,
  closeIngredientModal
} from '../services/slices/ingredientModalSlice';
import {
  openOrderModal,
  closeOrderModal
} from '../services/slices/orderModalSlice';
import { TIngredient, TOrder } from '../utils/types';

export const useModalNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const navigateToIngredient = useCallback(
    (ingredient: TIngredient) => {
      // Всегда открываем модальное окно поверх текущей страницы
      dispatch(openIngredientModal(ingredient));
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    },
    [navigate, location, dispatch]
  );

  const navigateToOrder = useCallback(
    (order: TOrder, basePath: string) => {
      // Всегда открываем модальное окно поверх текущей страницы
      dispatch(openOrderModal(order));
      navigate(`${basePath}/${order.number}`, {
        state: { background: location }
      });
    },
    [navigate, location, dispatch]
  );

  const handleModalClose = useCallback(() => {
    // Если есть background state, возвращаемся назад
    if (location.state?.background) {
      navigate(-1);
    }
  }, [navigate, location.state]);

  return {
    navigateToIngredient,
    navigateToOrder,
    handleModalClose
  };
};
