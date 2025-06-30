import { EntityManager } from '@mikro-orm/postgresql';
import { Partner, PartnerId } from '../../../domain/entities/partner.entity';
import { IPartnerRepository } from 'src/@core/events/domain/repositories/partner-repository.interface';

export class PartnerPostgresRepository implements IPartnerRepository {
  constructor(private entityManager: EntityManager) {}

  add(entity: Partner): void {
    this.entityManager.persist(entity);
  }

  async findById(id: string | PartnerId): Promise<Partner | null> {
    return this.entityManager.findOne(Partner, {
      id: typeof id === 'string' ? new PartnerId(id) : id,
    });
  }

  async findAll(): Promise<Partner[]> {
    return this.entityManager.find(Partner, {});
  }

  delete(entity: Partner): void {
    this.entityManager.remove(entity);
  }
}
