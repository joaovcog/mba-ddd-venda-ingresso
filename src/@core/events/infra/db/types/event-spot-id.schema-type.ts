import { Type } from '@mikro-orm/core';
import { EventSpotId } from '../../../domain/entities/event-spot';

export class EventSpotIdSchemaType extends Type<EventSpotId, string | null> {
  convertToDatabaseValue(
    valueObject: EventSpotId | undefined | null,
  ): string | null {
    if (valueObject instanceof EventSpotId) {
      return valueObject.value;
    }
    if (typeof valueObject === 'string') {
      return valueObject;
    }
    return null;
  }

  convertToJSValue(value: string): EventSpotId {
    return new EventSpotId(value);
  }

  getColumnType() {
    return `varchar(36)`;
  }
}
