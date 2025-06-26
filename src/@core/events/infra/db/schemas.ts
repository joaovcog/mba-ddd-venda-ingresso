import { EntitySchema } from '@mikro-orm/core';
import { Partner } from '../../domain/entities/partner.entity';
import { PartnerIdSchemaType } from './types/partner-id.schema-type';

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
