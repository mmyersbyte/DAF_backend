import { calcPessoaFisica2026 } from './pf2026.js';
import { calcPJPsicologiaArquitetura2026 } from './pjServicos2026.js';
import { calcPJAdvogado2026 } from './pjAdvogado2026.js';
import { normalizeProfessionId } from './professions.js';

// Comparativo PF × PJ — orquestrador único.

export function compareTaxes({ rendaMensal, custosMensais, profissao }) {
  const PF = calcPessoaFisica2026({ rendaMensal, custosMensais });

  const id = normalizeProfessionId(profissao);
  const PJ =
    id === 'advogado'
      ? calcPJAdvogado2026(rendaMensal)
      : calcPJPsicologiaArquitetura2026(rendaMensal);

  return {
    input: { rendaMensal, custosMensais },
    PF,
    PJ,
  };
}
