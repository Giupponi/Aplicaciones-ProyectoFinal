import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavegadorPrincipal } from './src/navigation/NavegadorPrincipal';
import { AuthProvider } from './src/context/AuthContext';
import { JuegosProvider } from './src/context/JuegosContext';


export default function App() {
  return (
    <AuthProvider>
      <JuegosProvider>
        <StatusBar style="light" />
        <NavegadorPrincipal />
      </JuegosProvider>
    </AuthProvider>
  );
};
