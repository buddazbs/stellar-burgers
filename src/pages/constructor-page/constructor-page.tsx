import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { RootState } from '../../services/store';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, items, error } = useAppSelector(
    (state: RootState) => state.ingredients
  );

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  if (isLoading) return <Preloader />;
  if (error)
    return <div className='text text_type_main-medium mt-10'>{error}</div>;

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
