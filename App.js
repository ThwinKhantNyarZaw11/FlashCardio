// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CreateSetScreen from './screens/CreateSetScreen';
import FlashcardListScreen from './screens/FlashcardListScreen';
import StudyScreen from './screens/StudyScreen';

// Navigation
import MainTabs from './navigation/MainTabs'; // Contains Home + Profile tabs

// Theme
import { ThemeProvider } from './context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="CreateSet" component={CreateSetScreen} />
            <Stack.Screen name="FlashcardList" component={FlashcardListScreen} />
            <Stack.Screen name="Study" component={StudyScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f9ff', // Match your light theme background
  },
});
