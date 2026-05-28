import { Type } from 'typebox';
import { Compile } from 'typebox/compile';
import { createCase } from '../../benchmarks/case.ts';

const Strict = Compile(Type.Object(
  {
    string: Type.String(),
    number: Type.Number(),
    maxNumber: Type.Number(),
    boolean: Type.Boolean(),
    longString: Type.String(),
    nested: Type.Object({
      string: Type.String(),
      number: Type.Number(),
      minNumber: Type.Number(),
      boolean: Type.Boolean(),
      deepNumberArray: Type.Array(Type.Number()),
    }, { additionalProperties: false }),
  },
  { additionalProperties: false },
));

const Loose = Compile(Type.Object(
  {
    string: Type.String(),
    number: Type.Number(),
    maxNumber: Type.Number(),
    boolean: Type.Boolean(),
    longString: Type.String(),
    nested: Type.Object({
      string: Type.String(),
      number: Type.Number(),
      minNumber: Type.Number(),
      boolean: Type.Boolean(),
      deepNumberArray: Type.Array(Type.Number()),
    }),
  },
));

// createCase('parseSafe', () => {
//   return data => Loose.Parse(data);
// });

createCase('parseStrict', () => {
  return data => Strict.Parse(data);
});

createCase('assertLoose', () => {
  return (data) => {
    if (Loose.Check(data)) return true;
    throw new Error('Invalid');
  };
});

createCase('assertStrict', () => {
  return (data) => {
    if (Strict.Check(data)) return true;
    throw new Error('Invalid');
  };
});
