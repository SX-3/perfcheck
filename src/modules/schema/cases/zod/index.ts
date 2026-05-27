import * as z from 'zod';
import { createCase } from '../../benchmarks/case.ts';

const schema = z.object({
  string: z.string(),
  number: z.number(),
  maxNumber: z.number(),
  boolean: z.boolean(),
  nested: z.object({
    string: z.string(),
    number: z.number(),
    minNumber: z.number(),
    boolean: z.boolean(),
    deepNumberArray: z.array(z.number()),
  }),
  longString: z.string(),
});

createCase('parseSafe', () => {
  return (data) => schema.parse(data);
});

createCase('parseStrict', () => {
  return (data) => schema.strict().parse(data);
});

createCase('assertLoose', () => {
  return (data) => {
    schema.parse(data);
    return true;
  };
});

createCase('assertStrict', () => {
  return (data) => {
    schema.strict().parse(data);
    return true;
  };
});
