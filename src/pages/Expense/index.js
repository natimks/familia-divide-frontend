import React, { useEffect, useState } from 'react';
import { Container, Card } from 'semantic-ui-react';

import Header from '../../components/Header';
import HeaderWithAddButton from '../../components/HeaderWithAddButton';
import CardWithRemoveButton from '../../components/CardWithRemoveButton';
import { ModalWithForm } from '../../components/ModalWithForm';

import {
  getLocalStorageCpf,
  getLocalStorageUserId,
} from '../../utils/storageUtils';
import formatCurrency from '../../utils/numberUtils';

import api from '../../services/api';

import './style.css';

function Expense() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const cpf = getLocalStorageCpf();
  const idUser = getLocalStorageUserId();

  useEffect(() => {
    api.get(`/users/${cpf}`).then((response) => {
      setExpenses(response.data.expenses);
    });
  }, [cpf]);

  async function handleDeleteExpense(idExpende) {
    try {
      await api.delete(`/expenses/${idExpende}`);
      setExpenses(expenses.filter((expense) => expense.id !== idExpende));
    } catch (err) {
      alert('Erro ao deletar despesa, tente novamente');
    }
  }

  async function handleAddIncome(expense) {
    try {
      expense.value = parseFloat(expense.value);
      expense.user_id = idUser;
      const response = await api.post(`/expenses/`, expense);

      let currentExpenses = expenses;
      currentExpenses.push(response.data);
      setExpenses(currentExpenses);

      setShowModal(false);
    } catch (err) {
      alert('Erro ao adicionar despesa, tente novamente');
    }
  }

  const getExpenseItem = (expense) => {
    return (
      <CardWithRemoveButton
        id={expense.id}
        header={expense.description}
        description={`Valor: ${formatCurrency(expense.value)}`}
        onClickRemoveItem={handleDeleteExpense}
      />
    );
  };

  const getModalExpense = () => {
    return (
      <ModalWithForm
        header='Adicionar despesa'
        submitFunction={handleAddIncome}
        showModalFunction={setShowModal}
        showModal={showModal}
      />
    );
  };

  return (
    <div className='expense-container'>
      {getModalExpense()}
      <Header />
      <HeaderWithAddButton
        title='Despesas'
        onClickAdd={(e) => setShowModal(true)}
      />
      <Container>
        <Card.Group>
          {expenses.map((expense) => getExpenseItem(expense))}
        </Card.Group>
      </Container>
    </div>
  );
}

export default Expense;
