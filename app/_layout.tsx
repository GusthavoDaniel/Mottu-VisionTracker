
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { MotoProvider } from './contexts/MotoContext';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <ThemeProvider>
      <MotoProvider>
        <Slot />
      </MotoProvider>
    </ThemeProvider>
  );
}
