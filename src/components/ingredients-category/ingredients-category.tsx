import { FC, useRef, forwardRef } from 'react';
import { useAppSelector } from '../../services/store';
import { IngredientsCategoryUI } from '@ui';
import type { RootState } from '../../services/store';
import type { TIngredient } from '../../utils/types';

interface IngredientsCategoryProps {
  title: string;
  ingredients: TIngredient[];
  type: string;
}

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  IngredientsCategoryProps
>(({ title, ingredients, type }, ref) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ingredientsCount = useAppSelector(
    (state: RootState) => state.burgerConstructor.ingredients
  );

  const getCount = (ingredientId: string) => {
    const ingredient = ingredientsCount.find(
      (item) => item._id === ingredientId
    );
    return ingredient ? 1 : 0;
  };

  const ingredientsCounters: { [key: string]: number } = {};
  ingredients.forEach((ingredient) => {
    ingredientsCounters[ingredient._id] = getCount(ingredient._id);
  });

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
