// lib/core/logic/motion.ts

import { SHAKE_THRESHOLD } from '@/lib/core/constants';

/**
 * Lógica pura del dominio para el proyecto Magic Dice.
 * Funciones sin side-effects: solo cálculos matemáticos basados en física de acelerómetro.
 */

// Tipo para los datos crudos del acelerómetro (en g)
export type Vector3 = {
  x: number;
  y: number;
  z: number;
  // timestamp?: number; // opcional si lo necesitas para throttling futuro
};

/**
 * Calcula la magnitud euclidiana del vector de aceleración.
 * Fórmula: √(x² + y² + z²)
 * En reposo ≈ 1.0 g (gravedad terrestre)
 * @param data Datos del acelerómetro {x, y, z}
 * @returns Magnitud total en g
 */
export const calculateMagnitude = (data: Vector3): number => {
  return Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
};

/**
 * Determina si el dispositivo está siendo agitado ("shake").
 * - Independiente de la dirección/orientación
 * - Compara magnitud contra umbral > gravedad normal (~1g)
 * - Basado en materia: umbral típico 1.78g para filtrar ruido y falsos positivos
 * @param data Datos del acelerómetro
 * @returns true si magnitud > SHAKE_THRESHOLD (hay shake)
 */
export const isShaking = (data: Vector3): boolean => {
  const magnitude = calculateMagnitude(data);
  return magnitude > SHAKE_THRESHOLD;
};

// Opcional: Función para interpretar orientación (útil para debug o features futuras)
export const getOrientationHint = (data: Vector3): string => {
  const mag = calculateMagnitude(data);
  if (Math.abs(mag - 1.0) > 0.2) return 'En movimiento o agitado';

  if (Math.abs(data.y) > 0.8) return 'Modo retrato (vertical)';
  if (Math.abs(data.x) > 0.8) return 'Modo paisaje (horizontal)';
  if (Math.abs(data.z) > 0.8) return 'Plano (sobre mesa)';

  return 'Orientación indeterminada';
};