import Ajv from 'ajv';
import { createCase } from '../../benchmarks/case.ts';

const schema = {
  $id: 'AjvTest',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    string: { type: 'string' },
    number: { type: 'number' },
    maxNumber: { type: 'number' },
    boolean: { type: 'boolean' },
    nested: {
      type: 'object',
      properties: {
        string: { type: 'string' },
        number: { type: 'number' },
        minNumber: { type: 'number' },
        boolean: { type: 'boolean' },
        deepNumberArray: { type: 'array', items: { type: 'number' } },
      },
      required: ['string', 'number', 'minNumber', 'boolean', 'deepNumberArray'],
    },
    longString: { type: 'string' },
  },
  required: ['string', 'number', 'maxNumber', 'boolean', 'nested', 'longString'],
};

const strictSchema = {
  ...schema,
  additionalProperties: false,
  properties: {
    ...schema.properties,
    nested: {
      ...schema.properties.nested,
      additionalProperties: false,
    },
  },
};

createCase('assertLoose', () => {
  const validate = new Ajv().compile(schema);
  return (data) => {
    if (!validate(data)) throw new Error(JSON.stringify(validate.errors));
    return true;
  };
});

createCase('assertStrict', () => {
  const validate = new Ajv().compile(strictSchema);
  return (data) => {
    if (!validate(data)) throw new Error(JSON.stringify(validate.errors));
    return true;
  };
});
