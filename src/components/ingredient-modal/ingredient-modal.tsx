import { FC, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/store';
import type { RootState } from '../../services/store';
import { closeIngredientModal } from '../../services/slices/ingredientModalSlice';
import { ModalUI } from '../ui/modal';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useModalNavigation } from '../../hooks/useModalNavigation';

export const IngredientModal: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.items
  );
  const { isOpen } = useAppSelector(
    (state: RootState) => state.ingredientModal
  );
  const { handleModalClose } = useModalNavigation();

  const ingredientData = useMemo(
    () => ingredients.find((i) => i._id === id) || null,
    [ingredients, id]
  );

  // Показываем модальное окно если есть background state или оно открыто через Redux
  const shouldShowModal = location.state?.background || isOpen;

  const handleClose = () => {
    dispatch(closeIngredientModal());
    handleModalClose();
  };

  if (!shouldShowModal || !ingredientData) {
    return null;
  }

  return (
    <ModalUI title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </ModalUI>
  );
};
