import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (meal) => {
        const { favorites } = get();
        if (!favorites.find((item) => item.idMeal === meal.idMeal)) {
          set({ favorites: [...favorites, meal] });
        }
      },
      
      removeFavorite: (idMeal) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter((item) => item.idMeal !== idMeal),
        });
      },
      
      isFavorite: (idMeal) => {
        const { favorites } = get();
        return favorites.some((item) => item.idMeal === idMeal);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useFavoritesStore;
