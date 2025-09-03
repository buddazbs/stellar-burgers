import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

const selectConstructor = (s: RootState) => s.burgerConstructor;

export const selectIngredientCounts = createSelector(
  [selectConstructor],
  (constructor) => {
    const counts: Record<string, number> = {};

    if (constructor.bun) {
      const bunId = constructor.bun._id;
      counts[bunId] = (counts[bunId] ?? 0) + 2;
    }

    for (const item of constructor.ingredients) {
      const ingId = item._id;
      counts[ingId] = (counts[ingId] ?? 0) + 1;
    }

    return counts;
  }
);
