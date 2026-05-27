import * as S from 'sury';
import { createCase } from '../../benchmarks/case.ts';

S.global({
  disableNanNumberValidation: true,
});

const schema = S.schema({
  string: S.string,
  number: S.number,
  maxNumber: S.number,
  boolean: S.boolean,
  nested: {
    string: S.string,
    number: S.number,
    minNumber: S.number,
    boolean: S.boolean,
    deepNumberArray: S.array(S.number),
  },
  longString: S.string,
});

createCase('parseSafe', () => {
  const parseSafe = S.parser(schema);
  return data => parseSafe(data);
});

createCase('parseStrict', () => {
  const parseStrict = S.parser(S.deepStrict(schema));
  return data => parseStrict(data);
});

createCase('assertLoose', () => {
  const assertLoose = S.parser(
    schema,
    S.schema(true).with(S.noValidation, true),
  );
  return data => assertLoose(data);
});

createCase('assertStrict', () => {
  const assertStrict = S.parser(
    S.deepStrict(schema),
    S.schema(true).with(S.noValidation, true),
  );
  return data => assertStrict(data);
});
