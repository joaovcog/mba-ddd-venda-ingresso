import { EntitySchema } from '@mikro-orm/core';
import { Partner } from '../../domain/entities/partner.entity';
import { PartnerIdSchemaType } from './types/partner-id.schema-type';
import { Customer } from '../../domain/entities/customer.entity';
import { CpfSchemaType } from './types/cpf.schema-type';
import { CustomerIdSchemaType } from './types/customer-id.schema-type';

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
