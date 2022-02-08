import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import PropTypes from 'prop-types';

const BudgetsContext = React.createContext();

const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);

  // TODO: Refactor useCallback, useMemo.
  const getBudgetExpenses = React.useCallback(
    (budgetId) => expenses.filter((expense) => expense.budgetId === budgetId),
    [],
  );

  const addExpense = React.useCallback(({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id: uuidV4(), description, amount, budgetId },
    ]);
  }, []);

  const addBudget = React.useCallback(({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }, []);

  const deleteBudget = React.useCallback(({ id }) => {
    setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
  }, []);

  const deleteExpense = React.useCallback(({ id }) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }, []);

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
    [],
  );

  return <BudgetsContext.Provider value={memoValues}>{children}</BudgetsContext.Provider>;
};

export default BudgetsProvider;

BudgetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
