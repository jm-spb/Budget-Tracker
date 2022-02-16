import React from 'react';

import BudgetCard from '../BudgetCard';

import UNCATEGORIZED_BUDGET_ID from '../../constants';
import useBudgets from '../../hooks/useBudgets';

const UncategorizedBudgetCard = () => {
  const { getBudgetExpenses } = useBudgets();
  const calculatedAmount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  if (calculatedAmount === 0) return null;

  return <BudgetCard amount={calculatedAmount} name="Uncategorized" gray />;
};

export default UncategorizedBudgetCard;
