import { meals } from './meals.js';

/**
 * Calcula TDEE con Mifflin-St Jeor y ajusta según meta.
 */
function calculateTDEE({ weight, height, age, sex, activity, goal }) {
  const s = sex==='M' ? 5 : -161;
  const bmr = 10*weight + 6.25*(height*100) - 5*age + s;
  let tdee = bmr * activity;
  if (goal==='perder')  tdee -= 500;
  if (goal==='ganar')   tdee += 500;
  return Math.round(tdee);
}

/**
 * Devuelve 7 comidas céntricas al objetivo calórico.
 */
export function getRecommendedMeals(user) {
  const daily = calculateTDEE(user);
  const perMeal = daily/3;
  const candidates = meals.filter(m=> Math.abs(m.calories-perMeal)<=100);
  return candidates.sort(()=>0.5-Math.random()).slice(0,7);
}
