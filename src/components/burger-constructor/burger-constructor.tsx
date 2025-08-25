import type { RootState } from '../../services/store';
import { FC, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TOrder } from '@utils-types';

import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
  createOrder,
  closeOrderModal,
  selectOrderRequest,
  selectOrderModalData
} from '../../services/slices/ordersSlice';
import {
  resetConstructor,
  type ConstructorState
} from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems: ConstructorState = useAppSelector(
    (state: RootState) => state.burgerConstructor
  );

  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData) as TOrder | null;

  useEffect(() => {
    if (orderModalData && !orderRequest) {
      dispatch(resetConstructor());
    }
  }, [orderModalData, orderRequest, dispatch]);

  const ingredients = constructorItems.ingredients || [];

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems.bun, ingredients]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(createOrder());
  };

  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{
        ...constructorItems,
        ingredients
      }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModalHandler}
    />
  );
};
