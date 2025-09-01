import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  setBunWithId,
  addIngredientWithId
} from '../../services/slices/constructorSlice';
import { useModalNavigation } from '../../hooks/useModalNavigation';
import { selectIngredientCounts } from '../../services/constructorSelectors';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { navigateToIngredient } = useModalNavigation();

    const counts = useAppSelector(selectIngredientCounts);
    const effectiveCount = counts[ingredient._id] ?? 0;

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBunWithId(ingredient));
      } else {
        dispatch(addIngredientWithId(ingredient));
      }
    };

    const handleClick = () => {
      navigateToIngredient(ingredient);
    };

    return (
      <div onClick={handleClick}>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={effectiveCount}
          handleAdd={handleAdd}
          locationState={{ background: location }}
        />
      </div>
    );
  }
);
