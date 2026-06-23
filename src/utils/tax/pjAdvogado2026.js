import {
  SALARIO_MINIMO_2026,
  ALIQUOTA_INSS_PROLABORE,
  ALIQUOTA_CPP_PATRONAL_ADV,
  ALIQUOTA_DAS_ANEXO_IV_ADV,
} from './constants2026.js';
import { calcIRPFProlaborePJ2026 } from './irpfProgressive2026.js';
import { round2 } from './round.js';

//PJ — Advocacia (Simples Anexo IV)
//- DAS ≈ 4,5% da receita (faixa inicial do Anexo IV no documento).
//- Estratégia didática: pró-labore **apenas o mínimo legal** (salário mínimo), lucros como distribuição.
//- INSS 11% (desconto do sócio) sobre pró-labore.
//- CPP patronal 20% sobre pró-labore, **fora do DAS** (recolhimento separado no material).
//- IRRF sobre pró-labore com mesma lógica de base simplificada + redutor.

export function calcPJAdvogado2026(rendaMensal) {
  const dasMensal = round2(rendaMensal * ALIQUOTA_DAS_ANEXO_IV_ADV);
  const prolabore = SALARIO_MINIMO_2026;

  const inss = round2(prolabore * ALIQUOTA_INSS_PROLABORE);
  const cppPatronal = round2(prolabore * ALIQUOTA_CPP_PATRONAL_ADV);
  const irpfPl = calcIRPFProlaborePJ2026(prolabore);

  const totalImpostos = round2(dasMensal + inss + cppPatronal + irpfPl.ir);
  const liquido = round2(rendaMensal - totalImpostos);

  return {
    faturamento: rendaMensal,
    dasMensal,
    dasRowLabel: 'DAS (Simples — Anexo IV, 4,5%)',
    cppPatronal,
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
    simples6: dasMensal,
  };
}
