import Cpf, { InvalidCpfError } from './cpf.vo';

describe('Cpf', () => {
  it('deve aceitar um CPF válido', () => {
    expect(() => new Cpf('935.411.347-80')).not.toThrow();
    expect(() => new Cpf('93541134780')).not.toThrow();
    expect(new Cpf('935.411.347-80').value).toBe('93541134780');
  });

  it('deve lançar erro se o CPF tiver menos de 11 dígitos', () => {
    expect(() => new Cpf('123.456.789-0')).toThrow(InvalidCpfError);
    expect(() => new Cpf('1234567890')).toThrow(/11 digits/);
  });

  it('deve lançar erro se o CPF tiver mais de 11 dígitos', () => {
    expect(() => new Cpf('123.456.789-000')).toThrow(InvalidCpfError);
    expect(() => new Cpf('123456789000')).toThrow(/11 digits/);
  });

  it('deve lançar erro se todos os dígitos forem iguais', () => {
    expect(() => new Cpf('111.111.111-11')).toThrow(
      /at least two different digits/,
    );
    expect(() => new Cpf('00000000000')).toThrow(InvalidCpfError);
  });

  it('deve lançar erro se os dígitos verificadores forem inválidos', () => {
    expect(() => new Cpf('935.411.347-81')).toThrow(/CPF is invalid/);
    expect(() => new Cpf('93541134781')).toThrow(InvalidCpfError);
  });

  it('deve remover caracteres não numéricos', () => {
    const cpf = new Cpf('935.411.347-80');
    expect(cpf.value).toBe('93541134780');
  });
});
