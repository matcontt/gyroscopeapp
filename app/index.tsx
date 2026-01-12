// app/index.tsx

import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-950 px-6">
      <Text className="text-white text-6xl font-bold mb-6">
        Magic Dice
      </Text>

      <Text className="text-gray-300 text-2xl text-center mb-12">
        Un dado mágico que responde a tus agitaciones.  
        ¡Solo mueve fuerte tu iPhone y descubre tu número!
      </Text>

      {/* Botón principal para entrar al juego */}
      <Link href="/games/dice" asChild>
        <TouchableOpacity 
          className="px-12 py-6 bg-purple-600 rounded-2xl active:bg-purple-700 shadow-lg shadow-purple-500/50"
        >
          <Text className="text-white text-3xl font-bold">
            ¡Lanzar el Dado!
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Texto pequeño opcional */}
      <Text className="text-gray-500 text-base mt-16 text-center">
        Agita fuerte • Detecta shake mayor 1.78g • Basado en física real
      </Text>
    </View>
  );
}