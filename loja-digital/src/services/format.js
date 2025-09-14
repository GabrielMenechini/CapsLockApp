export const toBRL = (n) =>
  Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });