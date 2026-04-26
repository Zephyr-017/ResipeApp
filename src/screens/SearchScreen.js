import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { searchMeals } from '../api/api';
import RecipeCard from '../components/RecipeCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleSearch = async () => {
    // Reset states
    setValidationError('');
    setError(null);
    Keyboard.dismiss();

    // Client-side Validation
    if (!query.trim()) {
      setValidationError('Kata kunci tidak boleh kosong');
      return;
    }
    if (query.trim().length < 3) {
      setValidationError('Minimal pencarian adalah 3 karakter');
      return;
    }

    setLoading(true);
    try {
      const data = await searchMeals(query);
      setResults(data);
      if (data.length === 0) {
        setError('Tidak ada resep yang ditemukan dengan kata kunci tersebut.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mencari resep.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <RecipeCard 
      item={item} 
      onPress={() => navigation.navigate('Detail', { recipeId: item.idMeal })} 
    />
  );

  return (
    <View style={styles.container}>
      {/* Search Form */}
      <View style={styles.searchBox}>
        <View style={[styles.inputContainer, validationError ? styles.inputError : null]}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Cari menu (misal: Chicken, Pasta)"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              if (validationError) setValidationError('');
            }}
            onSubmitEditing={handleSearch}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Cari</Text>
        </TouchableOpacity>
      </View>

      {/* Validation Message */}
      {validationError ? (
        <Text style={styles.validationText}>{validationError}</Text>
      ) : null}

      {/* Results Area */}
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !loading && !results.length && !error && (
              <View style={styles.emptyContainer}>
                <Ionicons name="restaurant-outline" size={80} color="#eee" />
                <Text style={styles.emptyText}>Mau masak apa hari ini?</Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchBox: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    gap: 10,
    elevation: 2,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF8F8',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 15,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  validationText: {
    color: '#D32F2F',
    fontSize: 12,
    marginLeft: 20,
    marginTop: -10,
    marginBottom: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
  },
});

export default SearchScreen;
