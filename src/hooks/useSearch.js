import { useState } from 'react';
import { Keyboard } from 'react-native';
import { searchMeals } from '../api/api';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleSearch = async () => {
    setValidationError('');
    setError(null);
    Keyboard.dismiss();

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

  const clearSearch = () => {
    setQuery('');
    setValidationError('');
  };

  return { 
    query, 
    setQuery, 
    results, 
    loading, 
    error, 
    validationError, 
    handleSearch, 
    clearSearch,
    setValidationError
  };
};

export default useSearch;
