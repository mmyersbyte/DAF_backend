import { ALIQUOTA_INSS_PROLABORE } from './constants2026.js';
import { calcIRPFPessoaFisica2026 } from './irpfProgressive2026.js';
import { round2 } from './round.js';

/**
 * Pessoa física autônoma — 2026.
 *
//- IRRF: modo deduções vs desconto simplificado + Tabela 1 + redutor 
 * - INSS: modelo didático de 11% sobre a **receita mensal** (muitos autônomos não recolhem na prática;
 */
export function calcPessoaFisica2026({ rendaMensal, custosMensais }) {
  const irpf = calcIRPFPessoaFisica2026({ rendaMensal, custosMensais });

  const inssPF = round2(rendaMensal * ALIQUOTA_INSS_PROLABORE);
  const impostoTotal = round2(irpf.ir + inssPF);
  const liquido = round2(rendaMensal - impostoTotal);

  return {
    inss: inssPF,
    ir: irpf.ir,
    isentoIR: irpf.ir === 0,
    imposto: impostoTotal,
    effectiveRate: rendaMensal > 0 ? round2(irpf.ir / rendaMensal) : 0,
    liquido,
    bracket: irpf.bracket,
    modoIRPF: irpf.modoIRPF,
    baseCalculoIR: irpf.baseCalculoIR,
  };
}
