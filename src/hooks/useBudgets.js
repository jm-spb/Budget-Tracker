import React from 'react';
import { BudgetsContext } from '../context/BudgetContext';

const useBudgets = () => React.useContext(BudgetsContext);

export default useBudgets;
