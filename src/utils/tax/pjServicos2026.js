import {
  SALARIO_MINIMO_2026,
  ALIQUOTA_INSS_PROLABORE,
  PROLABORE_FRACAO_RECEITA_SERVICOS,
  ALIQUOTA_DAS_ANEXO_III_PLANEJAMENTO,
} from './constants2026.js';
import { calcIRPFProlaborePJ2026 } from './irpfProgressive2026.js';
import { round2 } from './round.js';

//PJ — Psicologia e Arquitetura (Simples Nacional, planejamento Anexo III)
//- DAS estimado em 6% da receita para fins de planejamento no Anexo III.
//- Pró-labore ≈ 28% da receita, mínimo salário mínimo 2026.
//- INSS 11% sobre pró-labore.
//- IRRF sobre pró-labore com base simplificada (pró-labore − 607,20) + redutor referenciado ao pró-labore.
//- CPP patronal não é segregado aqui (incluso no enquadramento didático do DAS).

export function calcPJPsicologiaArquitetura2026(rendaMensal) {
  const dasMensal = round2(rendaMensal * ALIQUOTA_DAS_ANEXO_III_PLANEJAMENTO);
  const prolabore = round2(
    Math.max(
      SALARIO_MINIMO_2026,
      rendaMensal * PROLABORE_FRACAO_RECEITA_SERVICOS,
    ),
  );
  const inss = round2(prolabore * ALIQUOTA_INSS_PROLABORE);
  const irpfPl = calcIRPFProlaborePJ2026(prolabore);

  const totalImpostos = round2(dasMensal + inss + irpfPl.ir);
  const liquido = round2(rendaMensal - totalImpostos);

  return {
    faturamento: rendaMensal,
    dasMensal,
    dasRowLabel: 'DAS (Simples — Anexo III, 6%)',
    cppPatronal: 0,
    impostoMensal: dasMensal,
    prolabore,
    inss,
    irProlabore: irpfPl,
    ir: irpfPl.ir,
    isentoIR: irpfPl.ir === 0,
    totalImpostos,
    effectiveRate: rendaMensal > 0 ? round2(totalImpostos / rendaMensal) : 0,
    liquido,
    faixa: null,
    // Compatibilidade com gráfico/tabela antigos que chamavam a linha de "Simples 6%"
    simples6: dasMensal,
  };
}

// console.log(calcPJPsicologiaArquitetura2026(15000));
