import React from 'react';
import BudgetCard from '../BudgetCard';
import useBudgets from '../../hooks/useBudgets';

import { calculateValueSum } from '../../utils';

const TotalBudgetCard = () => {
  const { budgets, expenses } = useBudgets();
  const calculatedAmount = calculateValueSum(expenses, 'amount');
  const calculatedMax = calculateValueSum(budgets, 'max');

  if (calculatedMax === 0) return null;

  return (
    <BudgetCard
      amount={calculatedAmount}
      name="Total"
      gray
      max={calculatedMax}
      hideButtons
    />
  );
};

export default React.memo(TotalBudgetCard);
