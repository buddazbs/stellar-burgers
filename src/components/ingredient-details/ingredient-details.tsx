import { FC, useMemo } from 'react';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import type { RootState } from '../../services/store';
import { NotFound404 } from '@pages';
import { IngredientDetails as IngredientDetailsComponent } from '@components';
import type { TIngredient } from '../../utils/types';
import styles from '../app/app.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.items
  );

  const ingredientData = useMemo(
    () => ingredients.find((i) => i._id === id) || null,
    [ingredients, id]
  );

  if (!ingredientData) {
    return <NotFound404 />;
  }

  if (location.state?.background) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <h1 className={`text text_type_main-large ${styles.detailHeader}`}>
        Детали ингредиента
      </h1>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
