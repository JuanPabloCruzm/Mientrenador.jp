// recommend.js
import { breakfasts, lunches, dinners } from './meals.js';

/**
 * Devuelve 7 ítems aleatorios de un array base.
 */
function pick7(arr) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 7);
}

export function getMealsPlan() {
  return {
    breakfasts: pick7(breakfasts),
    lunches:    pick7(lunches),
    dinners:    pick7(dinners)
  };
}