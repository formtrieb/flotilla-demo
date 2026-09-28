import { bySymbol, type Unit } from './unit.ts';

/**
 * Temperature scales. Base unit: degree Celsius.
 * Fahrenheit carries an offset: °C = (°F − 32) × 5/9 = °F × 5/9 − 160/9.
 */
export const TEMPERATURE_UNITS = [
  { dimension: 'temperature', symbol: '°C', name: 'degree Celsius', factor: 1 },
  { dimension: 'temperature', symbol: '°F', name: 'degree Fahrenheit', factor: 5 / 9, offset: -160 / 9 },
] as const satisfies readonly Unit<'temperature'>[];

export const TEMPERATURE = bySymbol<Unit<'temperature'>>(TEMPERATURE_UNITS);
