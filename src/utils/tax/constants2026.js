//constants fiscais de referência para simulações 2026

export const SALARIO_MINIMO_2026 = 1621;

/**
 * Desconto simplificado mensal do IR (valor fixo subtraído da RECEITA para obter a base do IRPF).
 * Mantido em R$ 607,20
 */
export const DESCONTO_SIMPLIFICADO_IR = 607.2;

/**
 * Limiar da regra “deduções vs simplificado”
 * se custos mensais > este valor, usa-se base = receita − custos; caso contrário, base = receita − 607,20.
 */
export const LIMIAR_CUSTOS_PARA_MODO_DEDUCOES = 607.2;

/**
 * Tabela progressiva mensal do IRPF — Tabela 1 (CALCULOS-2026).
 * Cada faixa: até `upTo` (base de cálculo mensal), alíquota `rate`, parcela a deduzir `deduction`.
 */
export const IRPF_BRACKETS_2026 = [
  { upTo: 2428.8, rate: 0, deduction: 0 },
  { upTo: 2826.65, rate: 0.075, deduction: 182.16 },
  { upTo: 3751.05, rate: 0.15, deduction: 394.16 },
  { upTo: 4664.68, rate: 0.225, deduction: 675.49 },
  { upTo: Infinity, rate: 0.275, deduction: 908.73 },
];

/** Alíquota INSS sobre pró-labore (contribuinte individual), material 2026. */
export const ALIQUOTA_INSS_PROLABORE = 0.11;

/** CPP patronal sobre pró-labore — apenas regime específico de advocacia no Simples (material). */
export const ALIQUOTA_CPP_PATRONAL_ADV = 0.2;

/** Percentual sugerido de pró-labore sobre receita — psicologia / arquitetura (Anexo III). */
export const PROLABORE_FRACAO_RECEITA_SERVICOS = 0.28;

/** DAS estimado no planejamento Anexo III (exemplos do material): receita × 6%. */
export const ALIQUOTA_DAS_ANEXO_III_PLANEJAMENTO = 0.06;

/** DAS advocacia — Anexo IV, faixa inicial do material: receita × 4,5%. */
export const ALIQUOTA_DAS_ANEXO_IV_ADV = 0.045;
