import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import useRandomMeal from '../hooks/useRandomMeal';
import RecipeCard from '../components/RecipeCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

const HomeScreen = ({ navigation }) => {
  const { meal, loading, error, refreshing, onRefresh } = useRandomMeal();

  if (loading && !refreshing) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2E7D32']} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rekomendasi Hari Ini</Text>
        <Text style={styles.headerSubtitle}>Menu Spesial yang dipilih khusus untukmu</Text>
      </View>

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        meal && (
          <RecipeCard
            item={meal}
            onPress={() => navigation.navigate('Detail', { recipeId: meal.idMeal })}
          />
        )
      )}

      <Text style={styles.footerHint}>Coba resep lainnya dengan tarik ke bawah!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2DFD2',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  hint: {
    marginTop: 10,
    color: '#484848ff',
    fontSize: 12,
  },
  footerHint: {
    textAlign: 'center',
    color: '#484848ff',
    marginVertical: 20,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
