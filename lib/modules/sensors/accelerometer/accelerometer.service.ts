// lib/modules/sensors/accelerometer/accelerometer.service.ts

import { Accelerometer } from 'expo-sensors';
import { UPDATE_INTERVAL_MS } from '@/lib/core/constants';

/**
 * Servicio de infraestructura para el acelerómetro.
 * Habla directamente con el hardware (MEMS) a través de Expo Sensors.
 * Responsabilidad única: suscribir/desuscribir y pasar datos crudos.
 */
export const SensorService = {
  /**
   * Suscribe al acelerómetro y ejecuta el callback con cada medición nueva.
   * @param callback Función que recibe { x, y, z, timestamp }
   * @returns Suscripción para poder removerla después
   */
  subscribe: (callback: (data: { x: number; y: number; z: number; timestamp: number }) => void) => {
    // Configura el intervalo de actualización usando la constante del dominio
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);

    // Retorna la suscripción creada por Expo
    return Accelerometer.addListener(callback);
  },

  /**
   * Desuscribe/remueve la suscripción para limpiar recursos y evitar memory leaks.
   * @param subscription Objeto de suscripción devuelto por addListener
   */
  unsubscribe: (subscription: any) => {
    if (subscription) {
      subscription.remove();
    }
  },

  // Opcional: Método para verificar disponibilidad (útil para futuras mejoras)
  isAvailable: async () => {
    return await Accelerometer.isAvailableAsync();
  },

  // Opcional: Solicitar permisos explícitos (en iOS Expo Go suele pedir automáticamente al primer uso)
  // requestPermissions: async () => {
  //   return await Accelerometer.requestPermissionsAsync();
  // },
};