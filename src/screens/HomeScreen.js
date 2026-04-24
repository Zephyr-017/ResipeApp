import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { fetchRandomMeal } from '../api/api';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import RecipeCard from '../components/RecipeCard';

const HomeScreen = ({ navigation }) => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getMeal = async () => {
    try {
      const data = await fetchRandomMeal();
      setMeal(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat resep. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getMeal();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getMeal();
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.center}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ErrorMessage message={error} />
          <Text style={styles.hint}>Tarik ke bawah untuk mencoba lagi</Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rekomendasi Hari Ini</Text>
        <Text style={styles.headerSubtitle}>Menu spesial yang dipilih acak untukmu</Text>
      </View>

      {meal && (
        <RecipeCard 
          item={meal} 
          onPress={() => navigation.navigate('Detail', { recipeId: meal.idMeal })} 
        />
      )}

      <Text style={styles.footerHint}>Tarik ke bawah untuk melihat menu acak lainnya!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
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
    color: '#999',
    fontSize: 12,
  },
  footerHint: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
