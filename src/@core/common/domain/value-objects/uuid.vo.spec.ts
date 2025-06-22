import { Uuid, InvalidUuidError } from './uuid.vo';

describe('Uuid Value Object', () => {
  it('should create a valid Uuid when no id is provided', () => {
    const uuid = new Uuid();
    expect(uuid.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('should create a valid Uuid when a valid id is provided', () => {
    const validId = '123e4567-e89b-12d3-a456-426614174000';
    const uuid = new Uuid(validId);
    expect(uuid.value).toBe(validId);
  });

  it('should throw InvalidUuidError when an invalid id is provided', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(InvalidUuidError);
  });

  it('should be equal when uuids are the same', () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const uuid1 = new Uuid(id);
    const uuid2 = new Uuid(id);
    expect(uuid1.value).toBe(uuid2.value);
    expect(uuid1.equals(uuid2)).toBe(true);
  });

  it('should not be equal when uuids are different', () => {
    const uuid1 = new Uuid();
    const uuid2 = new Uuid();
    expect(uuid1.value).not.toBe(uuid2.value);
    expect(uuid1.equals(uuid2)).toBe(false);
  });
});
