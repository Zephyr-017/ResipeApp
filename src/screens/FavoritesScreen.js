import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import useFavoritesStore from '../store/favorites';
import RecipeCard from '../components/RecipeCard';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useFavoritesStore();

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <RecipeCard
        item={item}
        onPress={() => navigation.navigate('Detail', { recipeId: item.idMeal })}
      />
      <TouchableOpacity
        style={styles.removeBadge}
        onPress={() => {
          removeFavorite(item.idMeal);
          Alert.alert('Info', `${item.strMeal} dihapus dari favorit`);
        }}
      >
        <Ionicons name="trash-outline" size={18} color="#fff" />
        <Text style={styles.removeText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={80} color="#fff" />
        <Text style={styles.emptyText}>Belum ada resep favorit.</Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.exploreText}>Cari Resep</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2DFD2',
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    position: 'relative',
  },
  removeBadge: {
    position: 'absolute',
    top: 20,
    right: 25,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
    zIndex: 10,
  },
  removeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2DFD2',
  },
  emptyText: {
    fontSize: 18,
    color: '#484848ff',
    marginTop: 15,
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  exploreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FavoritesScreen;
