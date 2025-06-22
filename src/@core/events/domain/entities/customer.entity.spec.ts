import Cpf from '../../../common/domain/value-objects/cpf.vo';
import { Customer } from './customer.entity';

describe('Customer Entity', () => {
  it('should create Customer with standard id 0', () => {
    const cpf = new Cpf('935.411.347-80');
    const customer = new Customer({ name: 'João', cpf });
    expect(customer.id).toBe(0);
    expect(customer.name).toBe('João');
    expect(customer.cpf.value).toBe('93541134780');
  });

  it('should create Customer with defined id', () => {
    const cpf = new Cpf('935.411.347-80');
    const customer = new Customer({ id: 5, name: 'Maria', cpf });
    expect(customer.id).toBe(5);
    expect(customer.name).toBe('Maria');
    expect(customer.cpf.value).toBe('93541134780');
  });

  it('should create Customer with static method create', () => {
    const customer = Customer.create({ name: 'Carlos', cpf: '935.411.347-80' });
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.name).toBe('Carlos');
    expect(customer.cpf.value).toBe('93541134780');
  });

  it('should serialize to JSON correctly', () => {
    const cpf = new Cpf('935.411.347-80');
    const customer = new Customer({ id: 10, name: 'Ana', cpf });
    const json = customer.toJSON();
    expect(json).toEqual({
      id: 10,
      cpf: '93541134780',
      name: 'Ana',
    });
  });
});
