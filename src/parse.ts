import type { Unit } from './unit.ts';

export interface Quantity {
  readonly value: number;
  readonly unit: Unit;
}

export class ParseError extends Error {
  constructor(input: string, reason: string) {
    super(`cannot parse "${input}": ${reason}`);
    this.name = 'ParseError';
  }
}

const QUANTITY = /^\s*(-?\d+(?:\.\d+)?)\s*(\S+)\s*$/;

/**
 * Parse a single quantity such as `"12.5 km"` or `"3kg"`.
 * `units` is the lookup to resolve the symbol against (e.g. `LENGTH`).
 */
export function parseQuantity(input: string, units: ReadonlyMap<string, Unit>): Quantity {
  const match = QUANTITY.exec(input);
  if (!match) throw new ParseError(input, 'expected "<number> <unit>"');
  const [, number, symbol] = match as unknown as [string, string, string];
  const unit = units.get(symbol);
  if (!unit) throw new ParseError(input, `unknown unit "${symbol}"`);
  return { value: Number(number), unit };
}
