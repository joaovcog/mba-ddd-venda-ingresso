import { AggregateRoot } from 'src/@core/common/domain/aggregate-root';

export type CustomerConstructorProps = {
  id?: number;
  cpf: string;
  name: string;
};

export class Customer extends AggregateRoot {
  id: number;
  cpf: string;
  name: string;

  constructor(props: CustomerConstructorProps) {
    super();
    this.id = props.id ?? 0;
    this.cpf = props.cpf;
    this.name = props.name;
  }

  static create(command: { name: string; cpf: string }): Customer {
    return new Customer(command);
  }

  toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
    };
  }
}
