// app/games/dice.tsx

import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useAccelerometer } from '@/lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking } from '@/lib/core/logic/motion';

export default function DiceScreen() {
  const [face, setFace] = useState(1);
  const [shaking, setShaking] = useState(false);
  const lastShakeTime = useRef(0); // Para cooldown persistente entre shakes

  const accelData = useAccelerometer();

  useEffect(() => {
    const now = Date.now();

    // Solo procesar si hay shake Y ha pasado suficiente tiempo desde el último
    if (isShaking(accelData) && now - lastShakeTime.current > 1200) {
      setShaking(true);
      const newFace = Math.floor(Math.random() * 6) + 1;
      setFace(newFace);

      // Actualizar timestamp del último shake válido
      lastShakeTime.current = now;

      // Quitar el feedback visual después de 600ms
      setTimeout(() => setShaking(false), 600);
    }
  }, [accelData]); // Dependencia: cada cambio en accelData dispara la verificación

  // Verificar si el acelerómetro está disponible (útil para debug en diferentes dispositivos)
  useEffect(() => {
    Accelerometer.isAvailableAsync()
      .then(available => {
        if (!available) {
          console.warn('Acelerómetro no disponible en este dispositivo');
          // Opcional: aquí podrías setear un estado de error para mostrar en UI
          // ej: setError('El sensor de movimiento no está disponible');
        } else {
          console.log('Acelerómetro disponible ✓');
        }
      })
      .catch(err => {
        console.error('Error al verificar disponibilidad del acelerómetro:', err);
      });
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <View className="flex-1 justify-center items-center bg-gray-950">
      <Text className="text-white text-9xl font-bold mb-8">
        {face}
      </Text>

      <Text className="text-gray-400 text-xl mb-12 text-center px-6">
        ¡Agita fuerte tu iPhone para lanzar el dado!
      </Text>

      {shaking && (
        <Text className="text-yellow-400 text-2xl animate-pulse">
          ¡Lanzando...!
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setFace(1)}
        className="mt-10 px-8 py-4 bg-blue-600 rounded-full active:bg-blue-700"
      >
        <Text className="text-white text-xl font-semibold">
          Resetear Dado
        </Text>
      </TouchableOpacity>

      {/* Debug opcional: muestra la magnitud actual (descomenta para pruebas) */}
      {/* 
      <Text className="text-gray-600 mt-8 text-xs">
        Magnitud actual: {Math.sqrt(accelData.x**2 + accelData.y**2 + accelData.z**2).toFixed(2)}g
      </Text>
      */}
    </View>
  );
}