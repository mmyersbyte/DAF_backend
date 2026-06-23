/**
 * Pacote de cálculo tributário didático — ano 2026.
 *
 * Estrutura:
 * - constants2026.js — números fixos (SM, alíquotas, tabela IR).
 * - irpfProgressive2026.js — tabela progressiva + redutor + helpers PF/PJ IR.
 * - pf2026.js — pessoa física.
 * - pjServicos2026.js — psicologia / arquitetura (Anexo III).
 * - pjAdvogado2026.js — advocacia (Anexo IV + CPP).
 * - compare.js — compareTaxes.
 * - professions.js — mapeamento profissão → motor PJ.
 */

export { compareTaxes } from './compare.js';
export { normalizeProfessionId } from './professions.js';
export {
  IRPF_BRACKETS_2026,
  SALARIO_MINIMO_2026,
  DESCONTO_SIMPLIFICADO_IR,
} from './constants2026.js';
export { calcIRPFProgressive, aplicarRedutorIRRF2026 } from './irpfProgressive2026.js';
