import { AggregateRoot } from '../../../common/domain/aggregate-root';
import { PartnerId } from './partner.entity';
import Uuid from '../../../common/domain/value-objects/uuid.vo';
import { EventSection } from './event-section';

export class EventId extends Uuid {}

export type CreateEventCommand = {
  name: string;
  description?: string | null;
  date: Date;
  partner_id: PartnerId;
};

export type EventConstructorProps = {
  id?: EventId | string;
  name: string;
  description: string | null;
  date: Date;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  partner_id: PartnerId | string;
  sections?: Set<EventSection>;
};

export class Event extends AggregateRoot {
  id: EventId;
  name: string;
  description: string | null;
  date: Date;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  partner_id: PartnerId;
  sections: Set<EventSection> = new Set<EventSection>();

  constructor(props: EventConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new EventId(props.id)
        : (props.id ?? new EventId());

    this.name = props.name;
    this.description = props.description;
    this.date = props.date;
    this.is_published = props.is_published;
    this.total_spots = props.total_spots;
    this.total_spots_reserved = props.total_spots_reserved;
    this.partner_id =
      props.partner_id instanceof PartnerId
        ? props.partner_id
        : new PartnerId(props.partner_id);
    this.sections = props.sections ?? new Set<EventSection>();
  }

  static create(command: CreateEventCommand) {
    return new Event({
      ...command,
      description: command.description ?? null,
      is_published: false,
      total_spots: 0,
      total_spots_reserved: 0,
    });
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      date: this.date,
      is_published: this.is_published,
      total_spots: this.total_spots,
      total_spots_reserved: this.total_spots_reserved,
      partner_id: this.partner_id.value,
    };
  }
}
