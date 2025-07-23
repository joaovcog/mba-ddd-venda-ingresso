import 'dotenv/config';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Customer, CustomerId } from '../../../domain/entities/customer.entity';
import { CustomerSchema } from '../schemas';
import { CustomerPostgresRepository } from './customer-postgres.repository';
import Cpf from '../../../../common/domain/value-objects/cpf.vo';

describe('CustomerPostgresRepository (integration)', () => {
  let orm: MikroORM<PostgreSqlDriver>;
  let repository: CustomerPostgresRepository;
  let em: EntityManager;

  beforeAll(async () => {
    orm = await MikroORM.init<PostgreSqlDriver>({
      entities: [CustomerSchema],
      dbName: process.env.POSTGRES_TEST_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: +(process.env.POSTGRES_PORT || 5432),
      driver: PostgreSqlDriver,
      forceEntityConstructor: true,
      debug: true,
    });
    await orm.getSchemaGenerator().refreshDatabase();
    em = orm.em.fork();
    repository = new CustomerPostgresRepository(em);
  });

  afterAll(async () => {
    await orm.close(true);
  });

  it('should add and find a customer', async () => {
    const customer = new Customer({
      name: 'Customer 1',
      cpf: new Cpf('19712982041'),
    });
    repository.add(customer);
    await em.flush();
    em.clear();

    const found = await repository.findById(customer.id);
    expect(found).toBeDefined();
    expect(found!.id.value).toBe(customer.id.value);
    expect(found!.name).toBe('Customer 1');
  });

  it('should find all customers', async () => {
    const customer1 = new Customer({
      name: 'Customer 1',
      cpf: new Cpf('43019511054'),
    });
    const customer2 = new Customer({
      name: 'Customer 2',
      cpf: new Cpf('99563860063'),
    });
    repository.add(customer1);
    repository.add(customer2);
    await em.flush();
    em.clear();

    const all = await repository.findAll();
    const names = all.map((c) => c.name);
    expect(names).toEqual(expect.arrayContaining(['Customer 1', 'Customer 2']));
  });

  it('should save customers and then delete one and add another', async () => {
    const customer1 = new Customer({
      name: 'Customer 1',
      cpf: new Cpf('29716425007'),
    });
    const customer2 = new Customer({
      name: 'Customer 2',
      cpf: new Cpf('08933713000'),
    });
    repository.add(customer1);
    repository.add(customer2);
    await em.flush();
    em.clear();

    const foundCustomer1 = await repository.findById(customer1.id);
    const customer3 = new Customer({
      name: 'Customer 3',
      cpf: new Cpf('51991896034'),
    });
    repository.add(customer3);
    if (foundCustomer1) {
      const managedCustomer1 = em.merge(Customer, foundCustomer1);
      repository.delete(managedCustomer1);
    }
    await em.flush();
    em.clear();

    const all = await repository.findAll();
    const names = all.map((c) => c.name);
    expect(names).toEqual(expect.arrayContaining(['Customer 2', 'Customer 3']));
  });

  it('should delete a customer', async () => {
    const id = new CustomerId();
    const customer = new Customer({
      id,
      name: 'Customer 1',
      cpf: new Cpf('91445850044'),
    });
    repository.add(customer);
    await em.flush();
    em.clear();

    const foundCustomer = await repository.findById(id);
    expect(foundCustomer).toBeDefined();
    expect(foundCustomer!.id.value).toBe(customer.id.value);
    expect(foundCustomer!.name).toBe('Customer 1');

    if (foundCustomer) {
      const managedCustomer = em.merge(Customer, foundCustomer);
      repository.delete(managedCustomer);
      await em.flush();
      em.clear();
    }

    const notFoundCustomer = await repository.findById(id);
    expect(notFoundCustomer).toBeNull();
  });
});
