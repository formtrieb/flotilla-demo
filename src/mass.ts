import { bySymbol, type Unit } from './unit.ts';

/** Mass units. Base unit: kilogram. */
export const MASS_UNITS = [
  { dimension: 'mass', symbol: 'mg', name: 'milligram', factor: 1e-6 },
  { dimension: 'mass', symbol: 'g', name: 'gram', factor: 0.001 },
  { dimension: 'mass', symbol: 'kg', name: 'kilogram', factor: 1 },
  { dimension: 'mass', symbol: 't', name: 'tonne', factor: 1000 },
  { dimension: 'mass', symbol: 'oz', name: 'ounce', factor: 0.028349523125 },
  { dimension: 'mass', symbol: 'lb', name: 'pound', factor: 0.45359237 },
] as const satisfies readonly Unit<'mass'>[];

export const MASS = bySymbol<Unit<'mass'>>(MASS_UNITS);
