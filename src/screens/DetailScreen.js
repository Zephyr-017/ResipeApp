import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { fetchMealDetail } from '../api/api';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { Ionicons } from '@expo/vector-icons';
import useFavoritesStore from '../store/favorites';

const DetailScreen = ({ route }) => {
  const { recipeId } = route.params || {};
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(recipeId);

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

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(recipeId);
      Alert.alert('Info', 'Dihapus dari favorit');
    } else {
      addFavorite(meal);
      Alert.alert('Sukses', 'Ditambahkan ke favorit');
    }
  };

  const getIngredients = () => {
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

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} />;
  if (!meal) return <ErrorMessage message="Resep tidak ditemukan" />;

  const ingredientsList = getIngredients();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{meal.strMeal}</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{meal.strCategory}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
                <Text style={[styles.badgeText, { color: '#2E7D32' }]}>{meal.strArea}</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
          >
            <Ionicons 
              name={favorite ? "heart" : "heart-outline"} 
              size={28} 
              color="#2E7D32" 
            />
          </TouchableOpacity>
        </View>

        {/* Tags Section - Moved Up */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <Text style={styles.tagsText}>{meal.strTags || 'Tag tidak tersedia'}</Text>
        </View>

        {/* Ingredients Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bahan-bahan</Text>
          {ingredientsList.map((item, index) => (
            <View key={index} style={styles.ingredientRow}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#2E7D32" />
              <Text style={styles.ingredientText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Instructions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cara Membuat</Text>
          <Text style={styles.instructions}>{meal.strInstructions}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.mainButton, favorite && styles.removeButton]} 
          onPress={toggleFavorite}
        >
          <Ionicons name={favorite ? "heart-dislike" : "heart"} size={20} color="#fff" />
          <Text style={styles.mainButtonText}>
            {favorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2DFD2',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: '#fff',
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    backgroundColor: '#E2DFD2',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  badgeText: {
    color: '#2C3639',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#E8F5E9',
    paddingBottom: 5,
    alignSelf: 'flex-start',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 8,
  },
  ingredientText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 10,
  },
  tagsText: {
    fontSize: 14,
    color: '#484848ff',
    fontStyle: 'italic',
  },
  instructions: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
    textAlign: 'justify',
  },
  mainButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
    gap: 10,
  },
  removeButton: {
    backgroundColor: '#9e9e9e',
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
