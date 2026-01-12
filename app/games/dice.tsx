// app/games/dice.tsx

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAccelerometer } from '@/lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking } from '@/lib/core/logic/motion';

export default function DiceScreen() {
  const [face, setFace] = useState(1);
  const [shaking, setShaking] = useState(false); // Para feedback visual opcional

  const accelData = useAccelerometer();

  useEffect(() => {
    if (isShaking(accelData)) {
      if (!shaking) { // Evita múltiples lanzamientos en un mismo shake prolongado
        const newFace = Math.floor(Math.random() * 6) + 1;
        setFace(newFace);
        setShaking(true);

        // Reset del estado de shake después de 800ms (simple debounce)
        setTimeout(() => setShaking(false), 800);
      }
    }
  }, [accelData]); // Se ejecuta cada vez que cambian los datos del acelerómetro

  return (
    <View className="flex-1 justify-center items-center bg-gray-950">
      <Text className="text-white text-9xl font-bold mb-8">
        {face}
      </Text>

      <Text className="text-gray-400 text-xl mb-12">
        ¡Agita el iPhone para lanzar el dado!
      </Text>

      {/* Feedback visual opcional durante shake */}
      {shaking && (
        <Text className="text-yellow-400 text-2xl animate-pulse">
          ¡Agitando...!
        </Text>
      )}

      {/* Botón para reset manual (útil en pruebas) */}
      <TouchableOpacity
        onPress={() => setFace(1)}
        className="mt-10 px-6 py-4 bg-blue-600 rounded-full"
      >
        <Text className="text-white text-lg font-semibold">
          Resetear
        </Text>
      </TouchableOpacity>
    </View>
  );
}