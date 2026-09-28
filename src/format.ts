import type { Unit } from './unit.ts';

export interface FormatOptions {
  /** Digits after the decimal point. Defaults to 2. */
  readonly precision?: number;
  /** Write the unit's full name instead of its symbol. */
  readonly longName?: boolean;
}

/**
 * Format a value with its unit, e.g. `format(1234.5, km)` → `"1234.50 km"`.
 * Trailing zeros are kept so columns line up.
 */
export function format(value: number, unit: Unit, options: FormatOptions = {}): string {
  const precision = options.precision ?? 2;
  const label = options.longName ? pluralize(unit.name, value) : unit.symbol;
  return `${value.toFixed(precision)} ${label}`;
}

function pluralize(name: string, value: number): string {
  if (Math.abs(value) === 1 || name.startsWith('degree ')) return name;
  if (name.endsWith('foot')) return name.slice(0, -4) + 'feet';
  if (name.endsWith('inch')) return name + 'es';
  return name + 's';
}
