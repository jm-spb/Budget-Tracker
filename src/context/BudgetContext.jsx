import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import UNCATEGORIZED_BUDGET_ID from '../constants';

export const BudgetsContext = React.createContext();

const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const getBudgetExpenses = (budgetId) =>
    expenses.filter((expense) => expense.budgetId === budgetId);

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id: uuidV4(), description, amount, budgetId },
    ]);
  };

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => prevExpenses.map((expense) => {
      if (expense.budgetId !== id) return expense;
      return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
    }))
    setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
  };

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const memoValues = React.useMemo(
    () => ({
      budgets,
      expenses,
      getBudgetExpenses,
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense,
    }),
    [budgets, expenses],
  );

  return <BudgetsContext.Provider value={memoValues}>{children}</BudgetsContext.Provider>;
};

export default BudgetsProvider;

BudgetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
