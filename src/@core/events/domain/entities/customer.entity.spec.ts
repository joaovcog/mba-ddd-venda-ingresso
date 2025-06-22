import Cpf from '../../../common/domain/value-objects/cpf.vo';
import { Customer } from './customer.entity';
import { CustomerId } from './customer.entity';
import Uuid from '../../../common/domain/value-objects/uuid.vo';

describe('Customer Entity', () => {
  it('should create Customer with auto generated id', () => {
    const cpf = new Cpf('935.411.347-80');
    const customer = new Customer({ name: 'João', cpf });
    expect(customer.id).toBeInstanceOf(Uuid);
    expect(customer.name).toBe('João');
    expect(customer.cpf.value).toBe('93541134780');
    expect(customer.id.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('should create Customer with defined id', () => {
    const cpf = new Cpf('935.411.347-80');
    const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
    const customer = new Customer({ id: customerId, name: 'Maria', cpf });
    expect(customer.id.value).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(customer.name).toBe('Maria');
    expect(customer.cpf.value).toBe('93541134780');
  });

  it('should create Customer with defined uuid as string', () => {
    const cpf = new Cpf('935.411.347-80');
    const customerId = '123e4567-e89b-12d3-a456-426614174000';
    const customer = new Customer({ id: customerId, name: 'Maria', cpf });
    expect(customer.id.value).toBe(customerId);
    expect(customer.name).toBe('Maria');
    expect(customer.cpf.value).toBe('93541134780');
  });

  it('should create Customer with static method create', () => {
    const customer = Customer.create({ name: 'Carlos', cpf: '935.411.347-80' });
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.name).toBe('Carlos');
    expect(customer.cpf.value).toBe('93541134780');
    expect(customer.id).toBeInstanceOf(Uuid);
    expect(customer.id.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('should serialize to JSON correctly', () => {
    const cpf = new Cpf('935.411.347-80');
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const customer = new Customer({ id: uuid, name: 'Ana', cpf });
    const json = customer.toJSON();
    expect(json).toEqual({
      id: customer.id,
      cpf: '93541134780',
      name: 'Ana',
    });
    expect(json.id.value).toBe(uuid);
  });

  it('should return true for equals when Customers have same id', () => {
    const cpf1 = new Cpf('935.411.347-80');
    const cpf2 = new Cpf('935.411.347-80');
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const customer1 = new Customer({ id, name: 'João', cpf: cpf1 });
    const customer2 = new Customer({ id, name: 'Maria', cpf: cpf2 });
    expect(customer1.equals(customer2)).toBe(true);
  });

  it('should return false for equals when Customers have different ids', () => {
    const cpf1 = new Cpf('935.411.347-80');
    const cpf2 = new Cpf('935.411.347-80');
    const customer1 = new Customer({ name: 'João', cpf: cpf1 });
    const customer2 = new Customer({ name: 'Maria', cpf: cpf2 });
    expect(customer1.equals(customer2)).toBe(false);
  });
});
