import { Type } from '@mikro-orm/core';
import { CustomerId } from '../../../domain/entities/customer.entity';

export class CustomerIdSchemaType extends Type<CustomerId, string | null> {
  // converts to the value that goes to the database
  convertToDatabaseValue(
    valueObject: CustomerId | undefined | null,
  ): string | null {
    if (valueObject instanceof CustomerId) {
      return valueObject.value;
    }
    if (typeof valueObject === 'string') {
      return valueObject;
    }
    return null;
  }

  // Converts when fetching data from the database to generate the value object instance. Does not work for relationships
  convertToJSValue(value: string): CustomerId {
    return new CustomerId(value);
  }

  getColumnType(): string {
    return 'varchar(36)';
  }
}
