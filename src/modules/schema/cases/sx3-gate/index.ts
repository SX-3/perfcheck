import {
  array,
  boolean,
  check,
  number,
  object,
  parse,
  settings,
  strict,
  string,
} from '@sx3/gate';
import { createCase } from '../../benchmarks/case.ts';

settings({ checkNaN: false });

const schema = object({
  string,
  number,
  maxNumber: number,
  boolean,
  nested: object({
    string,
    number,
    minNumber: number,
    boolean,
    deepNumberArray: array(number),
  }),
  longString: string,
});

createCase('parseSafe', () => parse(schema));

createCase('parseStrict', () => parse(strict(schema, true)));

createCase('assertLoose', () => {
  const assert = check(schema);
  return (data) => {
    if (assert(data)) return true;
    throw new Error('Invalid');
  };
});

createCase('assertStrict', () => {
  const assert = check(strict(schema, true));
  return (data) => {
    if (assert(data)) return true;
    throw new Error('Invalid');
  };
});
