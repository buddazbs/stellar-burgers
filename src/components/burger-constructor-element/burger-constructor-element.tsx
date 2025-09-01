import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  removeIngredient,
  moveIngredient
} from '../../services/slices/constructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { TConstructorIngredient } from './type';

interface BurgerConstructorElementProps {
  ingredient: TConstructorIngredient;
  index: number;
}

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index }) => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(
      (state) => state.burgerConstructor.ingredients
    );

    const handleDelete = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    const moveItem = (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={ingredients.length}
        handleMoveUp={() => moveItem(index, index - 1)}
        handleMoveDown={() => moveItem(index, index + 1)}
        handleClose={handleDelete}
      />
    );
  }
);
