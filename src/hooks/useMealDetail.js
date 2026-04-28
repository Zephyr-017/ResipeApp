import { useState, useEffect } from 'react';
import { fetchMealDetail } from '../api/api';

const useMealDetail = (recipeId) => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMealDetail = async () => {
      try {
        const data = await fetchMealDetail(recipeId);
        setMeal(data);
      } catch (err) {
        setError('Gagal memuat detail resep.');
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      getMealDetail();
    }
  }, [recipeId]);

  const getIngredients = () => {
    if (!meal) return [];
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return { meal, loading, error, ingredientsList: getIngredients() };
};

export default useMealDetail;
