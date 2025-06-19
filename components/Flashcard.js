import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setFlipped(!flipped)}
      style={[styles.card, flipped ? styles.cardBack : styles.cardFront]}
      activeOpacity={0.9}
    >
      <Text style={styles.label}>
        {flipped ? 'Back' : 'Front'}
      </Text>
      <Text style={styles.text}>
        {flipped ? card.back : card.front}
      </Text>
      <Text style={styles.flipHint}>🔁 Tap to Flip</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 30,
    margin: 20,
    minWidth: 280,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardFront: {
    backgroundColor: '#e0f2fe',
  },
  cardBack: {
    backgroundColor: '#fef9c3',
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },
  flipHint: {
    marginTop: 15,
    fontSize: 12,
    color: '#94a3b8',
  },
});
