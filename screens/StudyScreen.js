import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Flashcard from '../components/Flashcard';
import { useTheme } from '../context/ThemeContext';

export default function StudyScreen({ route }) {
  const { set } = route.params;
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % set.cards.length);
  };

  if (!set || set.cards.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyText, { color: theme.text }]}>
          No cards to study in this set.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>🧠 {set.title}</Text>
      <Text style={[styles.progress, { color: theme.text }]}>
        Card {index + 1} of {set.cards.length}
      </Text>

      <Flashcard card={set.cards[index]} />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]} onPress={nextCard}>
        <Text style={styles.buttonText}>Next ➡</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progress: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
