import typia from 'typia';

interface ISchema {
  string: string;
  number: number;
  maxNumber: number;
  boolean: boolean;
  nested: {
    string: string;
    number: number;
    minNumber: number;
    boolean: boolean;
    deepNumberArray: number[];
  };
  longString: string;
}

export const is = typia.createIs<ISchema>();
export const equals = typia.createEquals<ISchema>();
export const assert = typia.createAssert<ISchema>();
export const validate = typia.createValidate<ISchema>();
export const clone = typia.misc.createClone<ISchema>();
