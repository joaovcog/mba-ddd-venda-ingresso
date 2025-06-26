import { Type } from '@mikro-orm/core';
import { PartnerId } from '../../../domain/entities/partner.entity';

export class PartnerIdSchemaType extends Type<PartnerId, string | null> {
  // converts to the value that goes to the database
  convertToDatabaseValue(
    valueObject: PartnerId | undefined | null,
  ): string | null {
    if (valueObject instanceof PartnerId) {
      return valueObject.value;
    }
    if (typeof valueObject === 'string') {
      return valueObject;
    }
    return null;
  }

  // Converts when fetching data from the database to generate the value object instance. Does not work for relationships
  convertToJSValue(value: string): PartnerId {
    return new PartnerId(value);
  }

  getColumnType(): string {
    return 'varchar(36)';
  }
}
