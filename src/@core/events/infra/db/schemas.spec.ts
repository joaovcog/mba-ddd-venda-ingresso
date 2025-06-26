import 'dotenv/config';
import { MikroORM } from '@mikro-orm/core';
import { Partner } from '../../domain/entities/partner.entity';
import { PartnerSchema } from './schemas';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

function getEnvOrDefault(key: string, def: string) {
  return process.env[key] || def;
}

describe('Partner MikroORM integration', () => {
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init<PostgreSqlDriver>({
      entities: [PartnerSchema],
      dbName: process.env.POSTGRES_TEST_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: getEnvOrDefault('POSTGRES_HOST', 'localhost'),
      port: +getEnvOrDefault('POSTGRES_PORT', '5432'),
      driver: PostgreSqlDriver,
      forceEntityConstructor: true,
    });
    // await orm.getSchemaGenerator().ensureDatabase();
    // await orm.getSchemaGenerator().dropSchema();
    // await orm.getSchemaGenerator().createSchema();
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await orm.close(true);
  });

  it('should create and persist a Partner', async () => {
    const em = orm.em.fork();
    const partner = new Partner({ name: 'Parceiro Teste' });
    em.persist(partner); // set the entity to be persisted, but doesn't persist it yet
    await em.flush(); // flush the changes to the database, executing all the pending operations (persist, remove, etc.) Based on the Unit of Work pattern
    em.clear(); // clear the EntityManager to avoid stale data
    const foundPartner = await em.findOne(Partner, { id: partner.id });
    expect(foundPartner).toBeDefined();
    expect(foundPartner!.id).toBeDefined();
    expect(foundPartner!.name).toBe('Parceiro Teste');
  });
});
