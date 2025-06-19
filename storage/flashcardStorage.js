// storage/flashcardStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETS_KEY = 'flashcardSets';

export const loadFlashcardSets = async () => {
  try {
    const data = await AsyncStorage.getItem(SETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading sets:', error);
    return [];
  }
};

export const saveFlashcardSets = async (sets) => {
  try {
    await AsyncStorage.setItem(SETS_KEY, JSON.stringify(sets));
  } catch (e) {
    console.error('Failed to save sets', e);
  }
};

export const addFlashcardSet = async (newSet) => {
  try {
    const existingSets = await loadFlashcardSets();
    const updatedSets = [...existingSets, newSet];
    await saveFlashcardSets(updatedSets);
    console.log('✅ Set saved successfully:', newSet);
  } catch (error) {
    console.error('❌ Failed to add flashcard set:', error);
  }
};

export const deleteFlashcardSet = async (idToDelete) => {
  try {
    const existingSets = await loadFlashcardSets();
    const filteredSets = existingSets.filter(set => set.id !== idToDelete);
    await saveFlashcardSets(filteredSets);
    return true;
  } catch (e) {
    console.error('Failed to delete set:', e);
    return false;
  }
};
