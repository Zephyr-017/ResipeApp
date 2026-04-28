import { Alert } from 'react-native';
import useFavoritesStore from '../store/favorites';

const useFavoriteAction = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const toggleFavorite = (meal) => {
    if (!meal) return;
    
    const favorite = isFavorite(meal.idMeal);
    
    if (favorite) {
      removeFavorite(meal.idMeal);
      Alert.alert('Info', `${meal.strMeal} dihapus dari favorit`);
    } else {
      addFavorite(meal);
      Alert.alert('Sukses', `${meal.strMeal} ditambahkan ke favorit`);
    }
  };

  const confirmRemove = (meal) => {
    if (!meal) return;
    removeFavorite(meal.idMeal);
    Alert.alert('Info', `${meal.strMeal} dihapus dari favorit`);
  };

  return { toggleFavorite, isFavorite, confirmRemove };
};

export default useFavoriteAction;
