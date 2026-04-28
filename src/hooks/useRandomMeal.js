import { useState, useEffect } from 'react';
import { fetchRandomMeal } from '../api/api';

const useRandomMeal = () => {
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

  return { meal, loading, error, refreshing, onRefresh, getMeal };
};

export default useRandomMeal;
