import { createCase } from '../../benchmarks/case.ts';
// @ts-expect-error builded code
import { clone, equals, is } from './build/index.js';

createCase('parseSafe', () => (data) => {
  if (!is(data))
    throw new Error('invalid');
  return clone(data);
});

createCase('parseStrict', () => (data) => {
  if (!equals(data))
    throw new Error('invalid');
  return clone(data);
});

createCase('assertLoose', () => (data) => {
  if (!is(data))
    throw new Error('invalid');
  return true;
});

createCase('assertStrict', () => (data) => {
  if (!equals(data))
    throw new Error('invalid');
  return true;
});
