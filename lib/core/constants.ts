// lib/core/constants.ts

/**
 * Constantes físicas y de configuración para el proyecto Magic Dice
 * Basado en la documentación de Expo Accelerometer y física de MEMS
 */

// Umbral de magnitud para detectar "shake" (agitacion fuerte)
// > 1g (gravedad normal en reposo) → valor típico 1.78 para evitar falsos positivos
// Puedes ajustar entre 1.6 y 1.9 según pruebas en tu iPhone 14
export const SHAKE_THRESHOLD = 1.78;

// Intervalo de actualización del acelerómetro en milisegundos
// 100ms ≈ 10 lecturas por segundo → buen equilibrio entre respuesta rápida y batería
// Valores menores (ej: 16ms) consumen más batería y pueden requerir permisos extras en Android
export const UPDATE_INTERVAL_MS = 100;

// Opcional: gravedad aproximada en g (1g = 9.81 m/s²)
// Útil para comentarios o calibraciones futuras
export const GRAVITY_G = 1.0;

// Magnitud esperada en reposo (debería estar cerca de 1.0)
export const REST_MAGNITUDE = 1.0;