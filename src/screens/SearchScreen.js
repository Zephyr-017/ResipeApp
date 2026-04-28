import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import useSearch from '../hooks/useSearch';
import RecipeCard from '../components/RecipeCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const { 
    query, 
    setQuery, 
    results, 
    loading, 
    error, 
    validationError, 
    handleSearch, 
    clearSearch,
    setValidationError
  } = useSearch();

  const renderItem = ({ item }) => (
    <RecipeCard 
      item={item} 
      onPress={() => navigation.navigate('Detail', { recipeId: item.idMeal })} 
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, validationError ? styles.inputError : null]}>
            <Ionicons name="search" size={20} color="#484848ff" style={styles.searchIcon} />
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
              <TouchableOpacity onPress={clearSearch}>
                <Ionicons name="close-circle" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Cari</Text>
          </TouchableOpacity>
        </View>

        {validationError ? (
          <Text style={styles.validationText}>{validationError}</Text>
        ) : null}
      </View>

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
                <Ionicons name="restaurant-outline" size={80} color="#fff" />
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
    backgroundColor: '#E2DFD2',
  },
  searchBox: {
    padding: 15,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
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
    backgroundColor: '#2E7D32',
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
    marginTop: 5,
    marginLeft: 5,
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
    color: '#484848ff',
    fontSize: 16,
    marginTop: 10,
  },
});

export default SearchScreen;
