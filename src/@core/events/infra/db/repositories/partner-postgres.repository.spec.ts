import 'dotenv/config';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Partner, PartnerId } from '../../../domain/entities/partner.entity';
import { PartnerSchema } from '../schemas';
import { PartnerPostgresRepository } from './partner-postgres.repository';

describe('PartnerPostgresRepository (integration)', () => {
  let orm: MikroORM<PostgreSqlDriver>;
  let repository: PartnerPostgresRepository;
  let em: EntityManager;

  beforeAll(async () => {
    orm = await MikroORM.init<PostgreSqlDriver>({
      entities: [PartnerSchema],
      dbName: process.env.POSTGRES_TEST_DB || 'test',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +(process.env.POSTGRES_PORT || 5432),
      driver: PostgreSqlDriver,
      forceEntityConstructor: true,
      debug: true,
    });
    await orm.getSchemaGenerator().refreshDatabase();
    em = orm.em.fork();
    repository = new PartnerPostgresRepository(em);
  });

  afterAll(async () => {
    await orm.close(true);
  });

  it('should add and find a partner', async () => {
    const partner = new Partner({ name: 'Partner 1' });
    repository.add(partner);
    await em.flush();
    em.clear();

    const found = await repository.findById(partner.id);
    expect(found).toBeDefined();
    expect(found!.id.value).toBe(partner.id.value);
    expect(found!.name).toBe('Partner 1');
  });

  it('should find all partners', async () => {
    const partner1 = new Partner({ name: 'Partner 1' });
    const partner2 = new Partner({ name: 'Partner 2' });
    repository.add(partner1);
    repository.add(partner2);
    await em.flush();
    em.clear();

    const all = await repository.findAll();
    const names = all.map((p) => p.name);
    expect(names).toEqual(expect.arrayContaining(['Partner 1', 'Partner 2']));
  });

  it('should save partners and then delete one and add another', async () => {
    const partner1 = new Partner({ name: 'Partner 1' });
    const partner2 = new Partner({ name: 'Partner 2' });
    repository.add(partner1);
    repository.add(partner2);
    await em.flush();
    em.clear();

    const foundPartner1 = await repository.findById(partner1.id);
    const partner3 = new Partner({ name: 'Partner 3' });
    repository.add(partner3);
    if (foundPartner1) {
      const managedPartner1 = em.merge(Partner, foundPartner1);
      repository.delete(managedPartner1);
    }
    await em.flush();
    em.clear();

    const all = await repository.findAll();
    const names = all.map((p) => p.name);
    expect(names).toEqual(expect.arrayContaining(['Partner 2', 'Partner 3']));
  });

  it('should delete a partner', async () => {
    const id = new PartnerId();
    const partner = new Partner({ id, name: 'Partner 1' });
    repository.add(partner);
    await em.flush();
    em.clear();

    const foundPartner = await repository.findById(id);
    expect(foundPartner).toBeDefined();
    expect(foundPartner!.id.value).toBe(partner.id.value);
    expect(foundPartner!.name).toBe('Partner 1');

    repository.delete(foundPartner!);
    await em.flush();
    em.clear();

    const notFoundPartner = await repository.findById(id);
    expect(notFoundPartner).toBeNull();
  });

  it('should change the name of a partner', async () => {
    const id = new PartnerId();
    const partner = new Partner({ id, name: 'Partner 1' });
    repository.add(partner);
    await em.flush();
    em.clear();

    const foundPartner = await repository.findById(id);
    expect(foundPartner).toBeDefined();
    expect(foundPartner!.id.value).toBe(partner.id.value);
    expect(foundPartner!.name).toBe('Partner 1');

    foundPartner?.changeName('New Partner Name');
    repository.add(foundPartner!);
    await em.flush();
    em.clear();

    const foundChangedPartner = await repository.findById(id);
    expect(foundChangedPartner!.name).toBe('New Partner Name');
  });
});
