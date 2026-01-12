// lib/modules/sensors/accelerometer/useAccelerometer.ts

import { useState, useEffect } from 'react';
import { SensorService } from './accelerometer.service';

/**
 * Hook reactivo que expone los datos del acelerómetro de forma segura para componentes React.
 * - Gestiona suscripción y desuscripción automática con useEffect
 * - Actualiza el estado local cada vez que llega nueva data del sensor
 * - Retorna { x, y, z } (y opcionalmente timestamp si lo necesitas después)
 */
export const useAccelerometer = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
    // timestamp: 0, // opcional si lo quieres usar para throttling o logs
  });

  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    // Suscribirse al sensor al montar el componente
    const sub = SensorService.subscribe((accelerometerData) => {
      setData(accelerometerData);
    });

    setSubscription(sub);

    // Cleanup: desuscribir al desmontar el componente
    return () => {
      SensorService.unsubscribe(sub);
    };
  }, []); // Array vacío → solo se ejecuta al montar/desmontar

  return data;
};