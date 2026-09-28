import { bySymbol, type Unit } from './unit.ts';

/** Length units. Base unit: metre. */
export const LENGTH_UNITS = [
  { dimension: 'length', symbol: 'mm', name: 'millimetre', factor: 0.001 },
  { dimension: 'length', symbol: 'cm', name: 'centimetre', factor: 0.01 },
  { dimension: 'length', symbol: 'm', name: 'metre', factor: 1 },
  { dimension: 'length', symbol: 'km', name: 'kilometre', factor: 1000 },
  { dimension: 'length', symbol: 'in', name: 'inch', factor: 0.0254 },
  { dimension: 'length', symbol: 'ft', name: 'foot', factor: 0.3048 },
  { dimension: 'length', symbol: 'yd', name: 'yard', factor: 0.9144 },
  { dimension: 'length', symbol: 'mi', name: 'mile', factor: 1609.344 },
] as const satisfies readonly Unit<'length'>[];

export const LENGTH = bySymbol<Unit<'length'>>(LENGTH_UNITS);
