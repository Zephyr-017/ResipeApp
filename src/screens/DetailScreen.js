import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { fetchMealDetail } from '../api/api';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = ({ route }) => {
  const { recipeId } = route.params || {};
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

  const handleAddToFavorite = () => {
    // Logic for store will be added later
    Alert.alert('Sukses', `${meal.strMeal} ditambahkan ke favorit!`);
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} />;
  if (!meal) return <ErrorMessage message="Resep tidak ditemukan" />;

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
            onPress={handleAddToFavorite}
          >
            <Ionicons name="heart-outline" size={28} color="#FF6347" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <Text style={styles.tagsText}>{meal.strTags || 'No tags available'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{meal.strInstructions}</Text>
        </View>

        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={handleAddToFavorite}
        >
          <Ionicons name="heart" size={20} color="#fff" />
          <Text style={styles.mainButtonText}>Tambah ke Favorit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#FFF3E0',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  badgeText: {
    color: '#E65100',
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tagsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  instructions: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
    textAlign: 'justify',
  },
  mainButton: {
    backgroundColor: '#FF6347',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
    gap: 10,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
