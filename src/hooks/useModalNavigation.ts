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
      dispatch(openIngredientModal(ingredient));
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    },
    [navigate, location, dispatch]
  );

  const navigateToOrder = useCallback(
    (order: TOrder, basePath: string) => {
      dispatch(openOrderModal(order));
      navigate(`${basePath}/${order.number}`, {
        state: { background: location }
      });
    },
    [navigate, location, dispatch]
  );

  const handleModalClose = useCallback(() => {
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
