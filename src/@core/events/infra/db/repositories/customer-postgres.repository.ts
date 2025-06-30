import { EntityManager } from '@mikro-orm/postgresql';
import { Customer, CustomerId } from '../../../domain/entities/customer.entity';
import { ICustomerRepository } from '../../../domain/repositories/customer-repository.interface';

export class CustomerPostgresRepository implements ICustomerRepository {
  constructor(private entityManager: EntityManager) {}

  add(entity: Customer): void {
    this.entityManager.persist(entity);
  }

  async findById(id: string | CustomerId): Promise<Customer | null> {
    return this.entityManager.findOne(Customer, {
      id: typeof id === 'string' ? new CustomerId(id) : id,
    });
  }

  async findAll(): Promise<Customer[]> {
    return this.entityManager.find(Customer, {});
  }

  delete(entity: Customer): void {
    this.entityManager.remove(entity);
  }
}
