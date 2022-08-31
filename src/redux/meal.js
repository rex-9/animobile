/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */

import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

const FILTER_MEALS = 'yummyvalley/meal/FILTER_MEALS';
const DETAIL_MEAL = 'yummyvalley/meal/DETAIL_MEAL';

const initialState = [];

const mealXer = (state = initialState, action) => {
  let foundMeal = {};
  let foundIndex = 0;
  switch (action.type) {
    case `${FILTER_MEALS}/fulfilled`:
      return [...action.payload];

    case `${DETAIL_MEAL}/fulfilled`:
      foundMeal = state.find((m) => m.id === action.payload.id);
      foundMeal.detail = action.payload;
      console.log(foundMeal);
      foundIndex = state.findIndex((x) => x.id === action.payload.id);
      console.log(foundIndex);
      state[foundIndex] = foundMeal;
      console.log([...state]);
      return [...state];

    default:
      return state;
  }
};

const filterMeals = createAsyncThunk(FILTER_MEALS, async (cateName) => {
  const response = await fetch(API.filter(cateName));
  const data = await response.json();
  const meals = data.meals.map((meal) => ({
    name: meal.strMeal,
    photo: meal.strMealThumb,
    id: meal.idMeal,
  }));
  return meals;
});

// const generateArray = (mealDetail, strProp) => {
//   const props = [];
//   for (let i = 1; i < 21; i += 1) {
//     props.push(`str${strProp}${i}`);
//   }
//   const mealProps = [];
//   for (let i = 0; i < props.length; i += 1) {
//     mealProps.push(mealDetail.props[i]);
//   }
//   return mealProps;
// };

const detailMeal = createAsyncThunk(DETAIL_MEAL, async (id) => {
  const response = await fetch(API.detail(id));
  const data = await response.json();
  const mealFun = (mealDetail) => ({
    id: mealDetail.idMeal,
    name: mealDetail.strMeal,
    category: mealDetail.strCategory,
    style: mealDetail.strArea,
    instructions: mealDetail.strInstructions,
    photo: mealDetail.strMealThumb,
    video: mealDetail.strYoutube,
    source: mealDetail.strSource,
    ingredients: [mealDetail.strIngredient1, mealDetail.strIngredient1, mealDetail.strIngredient2, mealDetail.strIngredient3, mealDetail.strIngredient4, mealDetail.strIngredient5, mealDetail.strIngredient6, mealDetail.strIngredient7, mealDetail.strIngredient8, mealDetail.strIngredient9, mealDetail.strIngredient11, mealDetail.strIngredient12, mealDetail.strIngredient13, mealDetail.strIngredient14, mealDetail.strIngredient15, mealDetail.strIngredient16, mealDetail.strIngredient17, mealDetail.strIngredient18, mealDetail.strIngredient19, mealDetail.strIngredient20],
    measures: [mealDetail.strMeasure1, mealDetail.strMeasure1, mealDetail.strMeasure2, mealDetail.strMeasure3, mealDetail.strMeasure4, mealDetail.strMeasure5, mealDetail.strMeasure6, mealDetail.strMeasure7, mealDetail.strMeasure8, mealDetail.strMeasure9, mealDetail.strMeasure11, mealDetail.strMeasure12, mealDetail.strMeasure13, mealDetail.strMeasure14, mealDetail.strMeasure15, mealDetail.strMeasure16, mealDetail.strMeasure17, mealDetail.strMeasure18, mealDetail.strMeasure19, mealDetail.strMeasure20],
    // ingredients: generateArray(mealDetail, 'Ingredient'),
    // measures: generateArray(mealDetail, 'Measure'),
  });

  return mealFun(data.meals[0]);
});

export default mealXer;
export { filterMeals, detailMeal };
