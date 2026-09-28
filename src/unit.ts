/**
 * The shared shape every dimension module builds on.
 *
 * A unit converts linearly to and from its dimension's base unit
 * (metre, kilogram, …): `base = value * factor + offset`. Most units
 * have no offset; temperature scales are the exception.
 */
export interface Unit<D extends string = string> {
  /** The dimension this unit measures, e.g. `"length"`. */
  readonly dimension: D;
  /** Canonical symbol, e.g. `"km"`. */
  readonly symbol: string;
  /** Human-readable singular name, e.g. `"kilometre"`. */
  readonly name: string;
  /** Multiply by this to reach the base unit. */
  readonly factor: number;
  /** Add this after multiplying to reach the base unit. Defaults to 0. */
  readonly offset?: number;
}

export function toBase(value: number, unit: Unit): number {
  return value * unit.factor + (unit.offset ?? 0);
}

export function fromBase(value: number, unit: Unit): number {
  return (value - (unit.offset ?? 0)) / unit.factor;
}

export class DimensionMismatchError extends Error {
  constructor(from: Unit, to: Unit) {
    super(`cannot convert ${from.symbol} (${from.dimension}) to ${to.symbol} (${to.dimension})`);
    this.name = 'DimensionMismatchError';
  }
}

/** Convert `value` from one unit to another of the same dimension. */
export function convert(value: number, from: Unit, to: Unit): number {
  if (from.dimension !== to.dimension) throw new DimensionMismatchError(from, to);
  return fromBase(toBase(value, from), to);
}

/** Build a symbol → unit lookup for one dimension's table. */
export function bySymbol<U extends Unit>(units: readonly U[]): ReadonlyMap<string, U> {
  return new Map(units.map((u) => [u.symbol, u]));
}
