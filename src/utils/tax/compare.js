import { calcPessoaFisica2026 } from './pf2026.js';
import { calcPJPsicologiaArquitetura2026 } from './pjServicos2026.js';
import { calcPJAdvogado2026 } from './pjAdvogado2026.js';
import { normalizeProfessionId } from './professions.js';

export function compareTaxes({ rendaMensal, custosMensais, profissao }) {
  const renda = Number(rendaMensal);
  const custos = Number(custosMensais);

  const professionId = normalizeProfessionId(profissao);

  const PF = calcPessoaFisica2026({
    rendaMensal: renda,
    custosMensais: custos,
  });

  const PJ =
    professionId === 'advogado'
      ? calcPJAdvogado2026(renda)
      : calcPJPsicologiaArquitetura2026(renda);

  const bestOption =
    PJ.liquido > PF.liquido ? 'PJ' : PF.liquido > PJ.liquido ? 'PF' : 'EMPATE';

  return {
    input: {
      rendaMensal: renda,
      custosMensais: custos,
      profissao,
      professionId,
    },
    PF,
    PJ,
    bestOption,
  };
}
