import { EntityManager } from '@mikro-orm/postgresql';
import { Event, EventId } from '../../../domain/entities/event.entity';
import { IEventRepository } from 'src/@core/events/domain/repositories/event-repository.interface';

export class EventPostgresRepository implements IEventRepository {
  constructor(private entityManager: EntityManager) {}

  add(entity: Event): void {
    this.entityManager.persist(entity);
  }

  async findById(id: string | EventId): Promise<Event | null> {
    return this.entityManager.findOne(Event, {
      id: typeof id === 'string' ? new EventId(id) : id,
    });
  }

  async findAll(): Promise<Event[]> {
    return this.entityManager.find(Event, {});
  }

  delete(entity: Event): void {
    this.entityManager.remove(entity);
  }
}
