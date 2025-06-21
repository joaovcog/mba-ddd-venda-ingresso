import { Name } from './name.vo';

test('Deve criar um nome válido', () => {
  const nome = 'João da Silva';
  const nomeValido = new Name(nome);
  expect(nomeValido.value).toBe(nome);
});
