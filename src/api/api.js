const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchRandomMeal = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals[0]; // Random API returns an array with one meal
  } catch (error) {
    console.error('Error fetching random meal:', error);
    throw error;
  }
};

export const fetchMealDetail = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching meal detail:', error);
    throw error;
  }
};

export const searchMeals = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || []; // Return empty array if no meals found
  } catch (error) {
    console.error('Error searching meals:', error);
    throw error;
  }
};
