import React from 'react';
import { Container, Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import AddBudgetModal from './components/Modals/AddBudgetModal';
import AddExpenseModal from './components/Modals/AddExpenseModal';
import ViewExpensesModal from './components/Modals/ViewExpensesModal';
import useBudgets from './hooks/useBudgets';
import UNCATEGORIZED_BUDGET_ID from './constants';

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = React.useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = React.useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = React.useState('');
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = React.useState(null);
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = React.useCallback((budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }, []);

  const onViewExpensesClickMemoized = React.useCallback(
    () => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID),
    [],
  );

  const handleCloseAddExpenseModal = React.useCallback(
    () => setShowAddExpenseModal(false),
    [],
  );
  

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {budgets.map(({ id, name, max }) => {
            const calculatedAmount = getBudgetExpenses(id).reduce(
              (total, expense) => total + expense.amount,
              0,
            );
            return (
              <BudgetCard
                key={id}
                name={name}
                gray
                amount={calculatedAmount}
                max={max}
                onAddExpenseClick={() => openAddExpenseModal(id)}
                onViewExpensesClick={() => setViewExpenseModalBudgetId(id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={onViewExpensesClickMemoized}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={handleCloseAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId(null)}
      />
    </>
  );
};

export default (App);
