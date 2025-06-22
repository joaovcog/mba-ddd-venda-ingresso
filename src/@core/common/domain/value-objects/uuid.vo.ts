import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-objects';

export class Uuid extends ValueObject<string> {
  constructor(id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError(this.value);
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(invalidValue: string) {
    super(`Value ${invalidValue} must be a valid UUID`);
    this.name = 'InvalidUuidError';
  }
}

export default Uuid;
