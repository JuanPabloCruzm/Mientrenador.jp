// recommend.js
import { meals } from './meals.js';

/**
 * Calcula TDEE por Mifflin-St Jeor y ajusta por meta.
 */
function calculateTDEE({ weight, height, age, sex, activity, goal }) {
  const s   = sex==='M' ? 5 : -161;
  const bmr = 10*weight + 6.25*(height*100) - 5*age + s;
  let tdee  = bmr * activity;
  if (goal==='perder') tdee -= 500;
  if (goal==='ganar')  tdee += 500;
  return Math.round(tdee);
}

/**
 * Devuelve 7 comidas que casen con ~1/3 del TDEE.
 */
export function getRecommendedMeals(user) {
  const daily   = calculateTDEE(user);
  const target  = daily / 3;
  const filtered= meals.filter(m => Math.abs(m.calories - target) <= 100);
  const pick    = filtered.sort(() => 0.5 - Math.random()).slice(0,7);
  return pick;
}
