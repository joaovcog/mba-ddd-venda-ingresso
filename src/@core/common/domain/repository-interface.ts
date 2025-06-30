import { AggregateRoot } from './aggregate-root';

export interface IRepository<E extends AggregateRoot> {
  add(entity: E): void;
  findById(id: any): Promise<E | null>;
  findAll(): Promise<E[]>;
  delete(entity: E): void;
}
