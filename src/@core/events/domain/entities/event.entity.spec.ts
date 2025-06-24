import { Event, EventId } from './event.entity';
import { PartnerId } from './partner.entity';
import { EventSection } from './event-section';
import { EventSpot, EventSpotId } from './event-spot';

describe('Event Entity', () => {
  it('should create Event with auto generated id', () => {
    const partnerId = new PartnerId('111e4567-e89b-12d3-a456-426614174000');
    const date = new Date('2025-07-01T20:00:00Z');
    const event = new Event({
      name: 'Show',
      description: 'Big event',
      date,
      is_published: false,
      total_spots: 1000,
      total_spots_reserved: 0,
      partner_id: partnerId,
    });
    expect(event.id).toBeInstanceOf(EventId);
    expect(event.name).toBe('Show');
    expect(event.description).toBe('Big event');
    expect(event.date).toBe(date);
    expect(event.is_published).toBe(false);
    expect(event.total_spots).toBe(1000);
    expect(event.total_spots_reserved).toBe(0);
    expect(event.partner_id.value).toBe('111e4567-e89b-12d3-a456-426614174000');
    expect(event.sections.size).toBe(0);
  });

  it('should create Event with defined id as string', () => {
    const partnerId = new PartnerId('111e4567-e89b-12d3-a456-426614174000');
    const id = '222e4567-e89b-12d3-a456-426614174000';
    const date = new Date('2025-07-01T20:00:00Z');
    const event = new Event({
      id,
      name: 'Festival',
      description: null,
      date,
      is_published: true,
      total_spots: 500,
      total_spots_reserved: 100,
      partner_id: partnerId,
    });
    expect(event.id.value).toBe(id);
    expect(event.name).toBe('Festival');
    expect(event.description).toBeNull();
    expect(event.date).toBe(date);
    expect(event.is_published).toBe(true);
    expect(event.total_spots).toBe(500);
    expect(event.total_spots_reserved).toBe(100);
    expect(event.partner_id.value).toBe('111e4567-e89b-12d3-a456-426614174000');
  });

  it('should create Event with defined id as EventId', () => {
    const partnerId = new PartnerId('111e4567-e89b-12d3-a456-426614174000');
    const id = new EventId('333e4567-e89b-12d3-a456-426614174000');
    const date = new Date('2025-07-01T20:00:00Z');
    const event = new Event({
      id,
      name: 'Expo',
      description: 'Exposição',
      date,
      is_published: false,
      total_spots: 200,
      total_spots_reserved: 10,
      partner_id: partnerId,
    });
    expect(event.id.value).toBe('333e4567-e89b-12d3-a456-426614174000');
    expect(event.name).toBe('Expo');
    expect(event.description).toBe('Exposição');
    expect(event.date).toBe(date);
    expect(event.is_published).toBe(false);
    expect(event.total_spots).toBe(200);
    expect(event.total_spots_reserved).toBe(10);
    expect(event.partner_id.value).toBe('111e4567-e89b-12d3-a456-426614174000');
  });

  it('should create Event with sections', () => {
    const partnerId = new PartnerId('111e4567-e89b-12d3-a456-426614174000');
    const section1 = new EventSection({
      name: 'VIP',
      description: 'Front',
      is_published: false,
      total_spots: 10,
      total_spots_reserved: 0,
      price: 500,
    });
    const section2 = new EventSection({
      name: 'Pista',
      description: null,
      is_published: false,
      total_spots: 100,
      total_spots_reserved: 0,
      price: 100,
    });
    const sections = new Set([section1, section2]);
    const date = new Date('2025-07-01T20:00:00Z');
    const event = new Event({
      name: 'Show',
      description: 'Big event',
      date,
      is_published: false,
      total_spots: 110,
      total_spots_reserved: 0,
      partner_id: partnerId,
      sections,
    });
    expect(event.sections.size).toBe(2);
    expect([...event.sections]).toEqual([section1, section2]);
  });

  it('should create Event with static create method', () => {
    const partnerId = new PartnerId('111e4567-e89b-12d3-a456-426614174000');
    const date = new Date('2025-07-01T20:00:00Z');
    const event = Event.create({
      name: 'Evento Novo',
      date,
      partner_id: partnerId,
    });
    expect(event).toBeInstanceOf(Event);
    expect(event.name).toBe('Evento Novo');
    expect(event.description).toBeNull();
    expect(event.is_published).toBe(false);
    expect(event.total_spots_reserved).toBe(0);
    expect(event.total_spots).toBe(0);
    expect(event.partner_id.value).toBe('111e4567-e89b-12d3-a456-426614174000');
  });

  it('should serialize to JSON correctly', () => {
    const partnerId = new PartnerId('111e4567-e89b-12d3-a456-426614174000');
    const id = '222e4567-e89b-12d3-a456-426614174000';
    const date = new Date('2025-07-01T20:00:00Z');
    const event = new Event({
      id,
      name: 'Festival',
      description: 'Mega',
      date,
      is_published: true,
      total_spots: 500,
      total_spots_reserved: 100,
      partner_id: partnerId,
    });
    const json = event.toJSON();
    expect(json).toEqual({
      id,
      name: 'Festival',
      description: 'Mega',
      date,
      is_published: true,
      total_spots: 500,
      total_spots_reserved: 100,
      partner_id: '111e4567-e89b-12d3-a456-426614174000',
    });
  });

  it('should create Event with two sections, each having 3 spots', () => {
    const partnerId = new PartnerId('111e4567-e89b-12d3-a456-426614174000');
    const date = new Date('2025-07-01T20:00:00Z');
    // Create spots for section 1
    const spots1 = new Set([
      new EventSpot({
        id: new EventSpotId('111e4567-e89b-12d3-a456-426614174001'),
        location: 'A1',
        is_reserved: false,
        is_published: false,
      }),
      new EventSpot({
        id: new EventSpotId('111e4567-e89b-12d3-a456-426614174002'),
        location: 'A2',
        is_reserved: false,
        is_published: false,
      }),
      new EventSpot({
        id: new EventSpotId('111e4567-e89b-12d3-a456-426614174003'),
        location: 'A3',
        is_reserved: false,
        is_published: false,
      }),
    ]);
    // Create spots for section 2
    const spots2 = new Set([
      new EventSpot({
        id: new EventSpotId('111e4567-e89b-12d3-a456-426614174004'),
        location: 'B1',
        is_reserved: false,
        is_published: false,
      }),
      new EventSpot({
        id: new EventSpotId('111e4567-e89b-12d3-a456-426614174005'),
        location: 'B2',
        is_reserved: false,
        is_published: false,
      }),
      new EventSpot({
        id: new EventSpotId('111e4567-e89b-12d3-a456-426614174006'),
        location: 'B3',
        is_reserved: false,
        is_published: false,
      }),
    ]);
    // Create sections
    const section1 = new EventSection({
      name: 'VIP',
      description: 'Front',
      is_published: false,
      total_spots: 3,
      total_spots_reserved: 0,
      price: 500,
      spots: spots1,
    });
    const section2 = new EventSection({
      name: 'Pista',
      description: null,
      is_published: false,
      total_spots: 3,
      total_spots_reserved: 0,
      price: 100,
      spots: spots2,
    });
    const sections = new Set([section1, section2]);
    const event = new Event({
      name: 'Show',
      description: 'Big event',
      date,
      is_published: false,
      total_spots: 6,
      total_spots_reserved: 0,
      partner_id: partnerId,
      sections,
    });
    console.log(event);
    expect(event.sections.size).toBe(2);
    const [sec1, sec2] = [...event.sections];
    expect(sec1.spots.size).toBe(3);
    expect(sec2.spots.size).toBe(3);
    expect([...sec1.spots].map((s) => s.location)).toEqual(['A1', 'A2', 'A3']);
    expect([...sec2.spots].map((s) => s.location)).toEqual(['B1', 'B2', 'B3']);
  });
});
