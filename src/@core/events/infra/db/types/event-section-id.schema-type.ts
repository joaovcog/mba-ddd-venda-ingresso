import { Type } from '@mikro-orm/core';
import { EventSectionId } from '../../../domain/entities/event-section';

export class EventSectionIdSchemaType extends Type<
  EventSectionId,
  string | null
> {
  convertToDatabaseValue(
    valueObject: EventSectionId | undefined | null,
  ): string | null {
    if (valueObject instanceof EventSectionId) {
      return valueObject.value;
    }
    if (typeof valueObject === 'string') {
      return valueObject;
    }
    return null;
  }

  convertToJSValue(value: string): EventSectionId {
    return new EventSectionId(value);
  }

  getColumnType() {
    return `varchar(36)`;
  }
}
