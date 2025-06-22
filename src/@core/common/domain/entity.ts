import Uuid from './value-objects/uuid.vo';

export abstract class Entity {
  readonly id: Uuid;

  abstract toJSON(): any;

  equals(entity: this): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this.id === undefined || entity.id === undefined) {
      return false;
    }

    if (entity.constructor.name !== this.constructor.name) {
      return false;
    }

    return this.id.equals(entity.id);
  }
}
