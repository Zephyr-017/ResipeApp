import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  const openAPI = () => {
    Linking.openURL('https://www.themealdb.com/api.php');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Placeholder for Profile Picture */}
        <View style={styles.profileImageContainer}>
          <Ionicons name="person" size={80} color="#ccc" />
        </View>
        <Text style={styles.name}>Muhamad Zidan Rabani</Text>
        <Text style={styles.nim}>NIM: 2410501036</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={24} color="#FF6347" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Kelas</Text>
            <Text style={styles.infoValue}>B</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="book-outline" size={24} color="#FF6347" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Tema Projek</Text>
            <Text style={styles.infoValue}>Tema A</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="code-working-outline" size={24} color="#FF6347" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>API Credit</Text>
            <TouchableOpacity onPress={openAPI}>
              <Text style={[styles.infoValue, styles.link]}>TheMealDB API</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 ResepKita App</Text>
        <Text style={styles.footerSubText}>Dibuat dengan untuk tugas Mobile Lanjut</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FF6347',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  nim: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    padding: 20,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  infoTextContainer: {
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  link: {
    color: '#FF6347',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerSubText: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AboutScreen;
