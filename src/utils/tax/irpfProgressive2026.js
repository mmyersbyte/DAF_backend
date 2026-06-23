import {
  IRPF_BRACKETS_2026,
  DESCONTO_SIMPLIFICADO_IR,
  LIMIAR_CUSTOS_PARA_MODO_DEDUCOES,
} from './constants2026.js';
import { round2 } from './round.js';

/**
 * Etapa 1 — IR conforme tabela progressiva (Tabela 1 / CALCULOS-2026).
 * Fórmula por faixa: max(0, base × alíquota − parcela a deduzir).
 */
export function calcIRPFProgressive(base) {
  if (base <= 0) {
    return { imposto: 0, effectiveRate: 0, bracket: null };
  }

  for (const b of IRPF_BRACKETS_2026) {
    if (base <= b.upTo) {
      const imposto = Math.max(0, base * b.rate - b.deduction);
      const effectiveRate = base > 0 ? imposto / base : 0;
      return {
        imposto: round2(imposto),
        effectiveRate: round2(effectiveRate),
        bracket: b,
      };
    }
  }
  return { imposto: 0, effectiveRate: 0, bracket: null };
}

/**
 * Etapa 2 — Redutor do IR mensal 2026 (Tabela 2 / CALCULOS-2026).
 *
 * `rendimentoReferencia` é o valor usado para escolher a faixa do redutor:
 * - Na PF: normalmente a **receita mensal bruta** (exemplos Situações 1–3).
 * - No IR sobre pró-labore PJ: usar o **valor do pró-labore** como referência.
 *
 * Faixas (interpretação do material):
 * - até R$ 5.000: redução de até R$ 312,89 que pode zerar o imposto calculado na etapa 1.
 * - R$ 5.000,01 a R$ 7.350: redução = 978,62 − 0,133145 × rendimento (mínimo zero).
 * - acima de R$ 7.350: sem redutor adicional (imposto = etapa 1).
 */
export function aplicarRedutorIRRF2026(irrfAntesRedutor, rendimentoReferencia) {
  const r = rendimentoReferencia;
  if (r <= 5000) {
    const reducao = Math.min(312.89, irrfAntesRedutor);
    return round2(Math.max(0, irrfAntesRedutor - reducao));
  }
  if (r <= 7350) {
    const reducao = Math.max(0, 978.62 - 0.133145 * r);
    return round2(Math.max(0, irrfAntesRedutor - reducao));
  }
  return round2(irrfAntesRedutor);
}

/**
 * IRPF final PF: escolhe modo (deduções vs desconto simplificado), aplica tabela + redutor.
 *
 * Regra (INFORMAÇAO-CALCULOS): se custos > R$ 607,20 → base = receita − custos;
 * senão → base = receita − 607,20 (simplificado).
 */
export function calcIRPFPessoaFisica2026({ rendaMensal, custosMensais }) {
  const custos = Number(custosMensais) || 0;
  let base;
  let modo;

  if (custos > LIMIAR_CUSTOS_PARA_MODO_DEDUCOES) {
    base = Math.max(0, rendaMensal - custos);
    modo = 'deducoes';
  } else {
    base = Math.max(0, rendaMensal - DESCONTO_SIMPLIFICADO_IR);
    modo = 'desconto_simplificado';
  }

  const progressive = calcIRPFProgressive(base);
  const irFinal = aplicarRedutorIRRF2026(progressive.imposto, rendaMensal);

  return {
    ir: irFinal,
    modoIRPF: modo,
    baseCalculoIR: round2(base),
    irAntesRedutor: progressive.imposto,
    bracket: progressive.bracket,
    progressive,
  };
}

/**
 * IRPF sobre pró-labore PJ com desconto simplificado na base (ex.: pró-labore − 607,20),
 * depois tabela + redutor com referência = pró-labore (material psicologia/arquitetura).
 */
export function calcIRPFProlaborePJ2026(prolaboreMensal) {
  const base = Math.max(0, prolaboreMensal - DESCONTO_SIMPLIFICADO_IR);
  const progressive = calcIRPFProgressive(base);
  const irFinal = aplicarRedutorIRRF2026(progressive.imposto, prolaboreMensal);
  return {
    ir: irFinal,
    baseCalculoIR: round2(base),
    irAntesRedutor: progressive.imposto,
    bracket: progressive.bracket,
  };
}
