import { Type } from '@mikro-orm/core';
import Cpf from '../../../../common/domain/value-objects/cpf.vo';

export class CpfSchemaType extends Type<Cpf, string | null> {
  // converts to the value that goes to the database
  convertToDatabaseValue(valueObject: Cpf | undefined | null): string | null {
    if (valueObject instanceof Cpf) {
      return valueObject.value;
    }
    if (typeof valueObject === 'string') {
      return valueObject;
    }
    return null;
  }

  // Converts when fetching data from the database to generate the value object instance. Does not work for relationships
  convertToJSValue(value: string): Cpf {
    return new Cpf(value);
  }

  getColumnType(): string {
    return 'varchar(11)';
  }
}
