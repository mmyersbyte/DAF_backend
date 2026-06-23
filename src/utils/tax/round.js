//arredonda valor monetário para 2 casas decimais (centavos)
export function round2(x) {
  return Math.round(x * 100) / 100;
}
