import { Type } from '@mikro-orm/core';
import { EventId } from '../../../domain/entities/event.entity';

export class EventIdSchemaType extends Type<EventId, string | null> {
  convertToDatabaseValue(
    valueObject: EventId | undefined | null,
  ): string | null {
    if (valueObject instanceof EventId) {
      return valueObject.value;
    }
    if (typeof valueObject === 'string') {
      return valueObject;
    }
    return null;
  }

  convertToJSValue(value: string): EventId {
    return new EventId(value);
  }

  getColumnType() {
    return `varchar(36)`;
  }
}
