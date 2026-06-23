/**
 * Normaliza o texto da profissão (vindo do <select>) para um identificador estável usado no motor.
 */
export function normalizeProfessionId(profissao) {
  const s = String(profissao || '').toLowerCase();
  if (s.includes('advog')) return 'advogado';
  if (s.includes('arquit')) return 'arquiteto';
  return 'psicologo';
}
