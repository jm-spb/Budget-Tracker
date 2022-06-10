import React from 'react';
import PropTypes from 'prop-types';
import BudgetCard from '../BudgetCard';
import UNCATEGORIZED_BUDGET_ID from '../../constants';
import useBudgets from '../../hooks/useBudgets';
import { calculateValueSum } from '../../utils';

const UncategorizedBudgetCard = ({ onAddExpenseClick, onViewExpensesClick }) => {
  const { getBudgetExpenses } = useBudgets();
  const uncatExpenses = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID);
  const calculatedAmount = calculateValueSum(uncatExpenses, 'amount');

  if (calculatedAmount === 0) return null;

  return (
    <BudgetCard
      amount={calculatedAmount}
      name="Uncategorized"
      gray
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
    />
  );
};

export default React.memo(UncategorizedBudgetCard);

UncategorizedBudgetCard.propTypes = {
  onAddExpenseClick: PropTypes.func.isRequired,
  onViewExpensesClick: PropTypes.func.isRequired,
};
