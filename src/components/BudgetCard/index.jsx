import React from 'react';
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { currencyFormatter, getProgressBarVariant } from '../../utils';

const BudgetCard = ({ name, amount, max, gray, onAddExpenseClick, onViewExpensesClick, hideButtons }) => {
  const cardClassName = classNames({
    'bg-light': gray && amount <= max,
    'bg-danger bg-opacity-10': amount > max,
  });

  return (
    <Card className={cardClassName}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max !== Infinity && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max !== Infinity && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">View Expense</Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;

BudgetCard.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  max: PropTypes.number,
  gray: PropTypes.bool.isRequired,
  hideButtons: PropTypes.bool,
  onAddExpenseClick: PropTypes.func,
  onViewExpensesClick: PropTypes.func,
};

BudgetCard.defaultProps = {
  max: Infinity,
  hideButtons: false,
  onAddExpenseClick: () => {},
  onViewExpensesClick: () => {},
};
