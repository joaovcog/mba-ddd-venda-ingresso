import { EventSection, EventSectionId } from './event-section';
import { EventSpot, EventSpotId } from './event-spot';

describe('EventSection Entity', () => {
  it('should create EventSection with auto generated id', () => {
    const section = new EventSection({
      name: 'VIP',
      description: 'Front row',
      is_published: false,
      total_spots: 100,
      total_spots_reserved: 0,
      price: 200,
    });
    expect(section.id).toBeInstanceOf(EventSectionId);
    expect(section.name).toBe('VIP');
    expect(section.description).toBe('Front row');
    expect(section.is_published).toBe(false);
    expect(section.total_spots).toBe(100);
    expect(section.total_spots_reserved).toBe(0);
    expect(section.price).toBe(200);
    expect(section.spots.size).toBe(0);
  });

  it('should create EventSection with defined id as string', () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const section = new EventSection({
      id,
      name: 'Pista',
      description: null,
      is_published: true,
      total_spots: 50,
      total_spots_reserved: 10,
      price: 100,
    });
    expect(section.id.value).toBe(id);
    expect(section.name).toBe('Pista');
    expect(section.description).toBeNull();
    expect(section.is_published).toBe(true);
    expect(section.total_spots).toBe(50);
    expect(section.total_spots_reserved).toBe(10);
    expect(section.price).toBe(100);
  });

  it('should create EventSection with defined id as EventSectionId', () => {
    const id = new EventSectionId('123e4567-e89b-12d3-a456-426614174000');
    const section = new EventSection({
      id,
      name: 'Camarote',
      description: 'Vista privilegiada',
      is_published: true,
      total_spots: 20,
      total_spots_reserved: 5,
      price: 500,
    });
    expect(section.id.value).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(section.name).toBe('Camarote');
    expect(section.description).toBe('Vista privilegiada');
    expect(section.is_published).toBe(true);
    expect(section.total_spots).toBe(20);
    expect(section.total_spots_reserved).toBe(5);
    expect(section.price).toBe(500);
  });

  it('should create EventSection with spots', () => {
    const spot1 = new EventSpot({
      id: new EventSpotId('111e4567-e89b-12d3-a456-426614174001'),
      location: 'A1',
      is_reserved: false,
      is_published: false,
    });
    const spot2 = new EventSpot({
      id: new EventSpotId('111e4567-e89b-12d3-a456-426614174002'),
      location: 'A2',
      is_reserved: false,
      is_published: false,
    });
    const spots = new Set([spot1, spot2]);
    const section = new EventSection({
      name: 'Setor A',
      description: null,
      is_published: false,
      total_spots: 2,
      total_spots_reserved: 0,
      price: 50,
      spots,
    });
    expect(section.spots.size).toBe(2);
    expect([...section.spots]).toEqual([spot1, spot2]);
  });

  it('should create EventSection with static create method', () => {
    const section = EventSection.create({
      name: 'Setor B',
      total_spots: 10,
      price: 80,
    });
    expect(section).toBeInstanceOf(EventSection);
    expect(section.name).toBe('Setor B');
    expect(section.description).toBeNull();
    expect(section.is_published).toBe(false);
    expect(section.total_spots_reserved).toBe(0);
    expect(section.total_spots).toBe(10);
    expect(section.price).toBe(80);
  });

  it('should serialize to JSON correctly', () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const section = new EventSection({
      id,
      name: 'Setor C',
      description: 'Lateral',
      is_published: true,
      total_spots: 5,
      total_spots_reserved: 2,
      price: 60,
    });
    const json = section.toJSON();
    expect(json).toEqual({
      id,
      name: 'Setor C',
      description: 'Lateral',
      is_published: true,
      total_spots: 5,
      total_spots_reserved: 2,
      price: 60,
    });
  });
});
