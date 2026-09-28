# measure

A small, dependency-free unit converter for TypeScript.

```ts
import { convert, LENGTH, parseQuantity, format } from './src/index.ts';

const q = parseQuantity('12.5 km', LENGTH);
const miles = convert(q.value, q.unit, LENGTH.get('mi')!);
format(miles, LENGTH.get('mi')!); // "7.77 mi"
```

Dimensions today: length, mass, temperature (°C, °F).

## Why this repo exists

This is the demo project for [flotilla](https://github.com/formtrieb/flotilla), a Claude Code
toolkit that runs a batch of issues as parallel agents and works out beforehand which of them
would collide. The library is real and tested, and small on purpose: its open issues are the
backlog a wave runs against, and the recordings of those waves are made here.

## Develop

```bash
npm ci
npm test
npm run typecheck
```

Changes land through pull requests only; `main` is protected and both CI checks must pass.

## License

Apache-2.0
