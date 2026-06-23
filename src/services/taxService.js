import { prismaInstance } from '../lib/prismaInstance.js';
import { compareTaxes } from '../utils/tax/index.js';

export async function calculateAndSaveTaxComparison(userId, input) {
  const result = compareTaxes(input);

  const comparison = await prismaInstance.taxComparison.create({
    data: {
      userId: Number(userId),

      profession: result.input.profissao,
      professionId: result.input.professionId,
      monthlyIncome: result.input.rendaMensal,
      monthlyCosts: result.input.custosMensais,

      pfTotalTax: result.PF.imposto,
      pjTotalTax: result.PJ.totalImpostos,
      pfNetIncome: result.PF.liquido,
      pjNetIncome: result.PJ.liquido,

      bestOption: result.bestOption,

      resultJson: result,
    },
  });

  return {
    comparisonId: comparison.id,
    ...result,
  };
}

export async function listUserTaxComparisons(userId) {
  const comparisons = await prismaInstance.taxComparison.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return comparisons;
}

export async function getUserTaxComparisonById(userId, comparisonId) {
  const comparison = await prismaInstance.taxComparison.findFirst({
    where: {
      id: Number(comparisonId),
      userId: Number(userId),
    },
  });

  if (!comparison) {
    throw new Error('Comparativo não encontrado.');
  }

  return comparison;
}
