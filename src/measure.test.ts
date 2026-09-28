import { describe, expect, it } from 'vitest';
import {
  convert,
  DimensionMismatchError,
  format,
  LENGTH,
  MASS,
  ParseError,
  parseQuantity,
  TEMPERATURE,
} from './index.ts';

const unit = <T>(map: ReadonlyMap<string, T>, symbol: string): T => {
  const u = map.get(symbol);
  if (!u) throw new Error(`test setup: no unit ${symbol}`);
  return u;
};

describe('convert', () => {
  it('converts between length units', () => {
    expect(convert(1, unit(LENGTH, 'km'), unit(LENGTH, 'm'))).toBe(1000);
    expect(convert(1, unit(LENGTH, 'mi'), unit(LENGTH, 'km'))).toBeCloseTo(1.609344);
    expect(convert(12, unit(LENGTH, 'in'), unit(LENGTH, 'ft'))).toBeCloseTo(1);
  });

  it('converts between mass units', () => {
    expect(convert(1, unit(MASS, 'lb'), unit(MASS, 'g'))).toBeCloseTo(453.59237);
    expect(convert(16, unit(MASS, 'oz'), unit(MASS, 'lb'))).toBeCloseTo(1);
  });

  it('converts temperature scales with an offset', () => {
    expect(convert(100, unit(TEMPERATURE, '°C'), unit(TEMPERATURE, '°F'))).toBeCloseTo(212);
    expect(convert(32, unit(TEMPERATURE, '°F'), unit(TEMPERATURE, '°C'))).toBeCloseTo(0);
    expect(convert(-40, unit(TEMPERATURE, '°F'), unit(TEMPERATURE, '°C'))).toBeCloseTo(-40);
  });

  it('refuses to convert across dimensions', () => {
    expect(() => convert(1, unit(LENGTH, 'm'), unit(MASS, 'kg'))).toThrow(DimensionMismatchError);
  });
});

describe('parseQuantity', () => {
  it('parses a number and a symbol, with or without a space', () => {
    expect(parseQuantity('12.5 km', LENGTH)).toEqual({ value: 12.5, unit: unit(LENGTH, 'km') });
    expect(parseQuantity('3kg', MASS)).toEqual({ value: 3, unit: unit(MASS, 'kg') });
    expect(parseQuantity('-4 °C', TEMPERATURE).value).toBe(-4);
  });

  it('rejects unknown units and malformed input', () => {
    expect(() => parseQuantity('3 parsecs', LENGTH)).toThrow(ParseError);
    expect(() => parseQuantity('km 3', LENGTH)).toThrow(ParseError);
  });
});

describe('format', () => {
  it('formats with the symbol and two decimals by default', () => {
    expect(format(1234.5, unit(LENGTH, 'km'))).toBe('1234.50 km');
  });

  it('honours precision and long names', () => {
    expect(format(1, unit(LENGTH, 'ft'), { longName: true, precision: 0 })).toBe('1 foot');
    expect(format(3, unit(LENGTH, 'ft'), { longName: true, precision: 0 })).toBe('3 feet');
    expect(format(2, unit(LENGTH, 'in'), { longName: true, precision: 1 })).toBe('2.0 inches');
    expect(format(20, unit(TEMPERATURE, '°C'), { longName: true, precision: 0 })).toBe('20 degree Celsius');
  });
});
