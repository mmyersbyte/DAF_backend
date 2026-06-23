import {
  calculateAndSaveTaxComparison,
  listUserTaxComparisons,
  getUserTaxComparisonById,
} from '../services/taxService.js';

export async function compareAndSave(req, res) {
  try {
    const userId = req.user.id;

    const result = await calculateAndSaveTaxComparison(userId, req.body);

    return res.status(201).json({
      message: 'Comparativo calculado e salvo com sucesso.',
      result,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error.message ?? 'Erro ao calcular comparativo.',
    });
  }
}

export async function listComparisons(req, res) {
  try {
    const userId = req.user.id;

    const comparisons = await listUserTaxComparisons(userId);

    return res.status(200).json(comparisons);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error.message ?? 'Erro ao listar comparativos.',
    });
  }
}

export async function showComparison(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const comparison = await getUserTaxComparisonById(userId, id);

    return res.status(200).json(comparison);
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      message: error.message ?? 'Erro ao buscar comparativo.',
    });
  }
}
