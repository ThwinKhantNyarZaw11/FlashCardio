import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { addFlashcardSet } from '../storage/flashcardStorage';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../context/ThemeContext';

export default function CreateSetScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [cards, setCards] = useState([]);
  const { theme } = useTheme();

  const addCard = () => {
    if (front && back) {
      setCards([...cards, { front, back }]);
      setFront('');
      setBack('');
    }
  };

  const saveSet = async () => {
    const newSet = {
      id: uuidv4(),
      title,
      cards,
    };
    console.log('Saving set:', newSet);
    await addFlashcardSet(newSet);
    navigation.navigate('FlashcardList');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>📘 Create New Flashcard Set</Text>

      <TextInput
        placeholder="Set Title"
        placeholderTextColor="#94a3b8"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { color: theme.text, backgroundColor: theme.card, borderColor: theme.accent }]}
      />

      <View style={styles.cardInputContainer}>
        <TextInput
          placeholder="Front"
          placeholderTextColor="#94a3b8"
          value={front}
          onChangeText={setFront}
          style={[styles.inputHalf, { color: theme.text, backgroundColor: theme.card, borderColor: theme.accent }]}
        />
        <TextInput
          placeholder="Back"
          placeholderTextColor="#94a3b8"
          value={back}
          onChangeText={setBack}
          style={[styles.inputHalf, { color: theme.text, backgroundColor: theme.card, borderColor: theme.accent }]}
        />
      </View>

      <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.accent }]} onPress={addCard}>
        <Text style={styles.addBtnText}>➕ Add Card</Text>
      </TouchableOpacity>

      <FlatList
        data={cards}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.cardItem, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardText, { color: theme.text }]}>🧠 {item.front} ➜ {item.back}</Text>
          </View>
        )}
        style={{ marginTop: 20, maxHeight: 200 }}
      />

      <TouchableOpacity
        style={[styles.saveBtn, (!title || cards.length === 0) && styles.disabledBtn, { backgroundColor: (!title || cards.length === 0) ? '#9ca3af' : '#10b981' }]}
        onPress={saveSet}
        disabled={!title || cards.length === 0}
      >
        <Text style={styles.saveBtnText}>💾 Save Set</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  cardInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputHalf: {
    flex: 0.48,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  addBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    elevation: 2,
  },
  addBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  cardItem: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    elevation: 3,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
  },
  disabledBtn: {
    backgroundColor: '#9ca3af',
  },
});
