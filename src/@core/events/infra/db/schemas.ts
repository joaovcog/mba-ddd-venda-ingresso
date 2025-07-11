import { Cascade, EntitySchema } from '@mikro-orm/core';
import { Partner } from '../../domain/entities/partner.entity';
import { PartnerIdSchemaType } from './types/partner-id.schema-type';
import { Customer } from '../../domain/entities/customer.entity';
import { CpfSchemaType } from './types/cpf.schema-type';
import { CustomerIdSchemaType } from './types/customer-id.schema-type';
import { EventIdSchemaType } from './types/event-id.schema-type';
import { EventSection } from '../../domain/entities/event-section';
import { EventSectionIdSchemaType } from './types/event-section-id.schema-type';
import { EventSpot } from '../../domain/entities/event-spot';
import { EventSpotIdSchemaType } from './types/event-spot-id.schema-type';
import { Event } from '../../domain/entities/event.entity';

export const PartnerSchema = new EntitySchema<Partner>({
  class: Partner,
  tableName: 'partners',
  properties: {
    id: {
      primary: true,
      type: new PartnerIdSchemaType(),
    },
    name: {
      type: 'string',
      length: 255,
    },
  },
});

export const CustomerSchema = new EntitySchema<Customer>({
  class: Customer,
  tableName: 'customers',
  uniques: [{ properties: ['cpf'] }],
  properties: {
    id: {
      primary: true,
      type: new CustomerIdSchemaType(),
    },
    name: {
      type: 'string',
      length: 255,
    },
    cpf: {
      type: new CpfSchemaType(),
    },
  },
});

export const EventSchema = new EntitySchema<Event>({
  class: Event,
  tableName: 'events',
  properties: {
    id: {
      primary: true,
      type: new EventIdSchemaType(),
    },
    name: { type: 'string', length: 255 },
    description: { type: 'text', nullable: true },
    date: { type: 'date' },
    is_published: { type: 'boolean', default: false },
    total_spots: { type: 'number', default: 0 },
    total_spots_reserved: { type: 'number', default: 0 },
    sections: {
      reference: '1:m',
      entity: () => EventSection,
      mappedBy: 'event_id',
      eager: true,
      cascade: [Cascade.ALL],
    },
    partner_id: {
      reference: 'm:1',
      entity: () => Partner,
      hidden: true,
      mapToPk: true,
      type: new PartnerIdSchemaType(),
      inherited: true,
    },
  },
});

export const EventSectionSchema = new EntitySchema<EventSection>({
  class: EventSection,
  tableName: 'event_sections',
  properties: {
    id: {
      primary: true,
      type: new EventSectionIdSchemaType(),
    },
    name: { type: 'string', length: 255 },
    description: { type: 'text', nullable: true },
    is_published: { type: 'boolean', default: false },
    total_spots: { type: 'number', default: 0 },
    total_spots_reserved: { type: 'number', default: 0 },
    price: { type: 'number', default: 0 },
    spots: {
      reference: '1:m',
      entity: () => EventSpot,
      mappedBy: 'event_section_id',
      eager: true,
      cascade: [Cascade.ALL],
    },
    event_id: {
      reference: 'm:1',
      entity: () => Event,
      type: new EventIdSchemaType(),
      hidden: true,
      mapToPk: true,
    },
  },
});

export const EventSpotSchema = new EntitySchema<EventSpot>({
  class: EventSpot,
  tableName: 'event_spots',
  properties: {
    id: {
      primary: true,
      type: new EventSpotIdSchemaType(),
    },
    location: { type: 'string', length: 255, nullable: true },
    is_reserved: { type: 'boolean', default: false },
    is_published: { type: 'boolean', default: false },
    event_section_id: {
      reference: 'm:1',
      entity: () => EventSection,
      type: new EventSectionIdSchemaType(),
      hidden: true,
      mapToPk: true,
    },
  },
});
