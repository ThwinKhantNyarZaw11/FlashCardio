import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { loadFlashcardSets, deleteFlashcardSet } from '../storage/flashcardStorage';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function FlashcardListScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [sets, setSets] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchSets = async () => {
      const saved = await loadFlashcardSets();
      setSets(saved);
    };

    if (isFocused) {
      fetchSets();
    }
  }, [isFocused]);

  const handleDelete = async (id) => {
    const success = await deleteFlashcardSet(id);
    if (success) {
      const updated = await loadFlashcardSets();
      setSets(updated);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>📚 Your Flashcard Sets</Text>

      {sets.length === 0 ? (
        <Text style={[styles.empty, { color: theme.text }]}>No sets yet. Go create one!</Text>
      ) : (
        <FlatList
          data={sets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <TouchableOpacity onPress={() => navigation.navigate('Study', { set: item })}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.cardSubtitle, { color: theme.text }]}>{item.cards.length} cards</Text>
                <Text style={[styles.studyText, { color: theme.accent }]}>▶ Study This Set</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  studyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  deleteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
  },
  deleteText: {
    fontSize: 20,
    color: '#ef4444',
  },
});
