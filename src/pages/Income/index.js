import React, { useEffect, useState } from 'react';
import { Card, Container } from 'semantic-ui-react';
import api from '../../services/api';

import Header from '../../components/Header';
import HeaderWithAddButton from '../../components/HeaderWithAddButton';
import CardWithRemoveButton from '../../components/CardWithRemoveButton';
import { ModalWithForm } from '../../components/ModalWithForm';

import {
  getLocalStorageCpf,
  getLocalStorageUserId,
} from '../../utils/storageUtils';
import formatCurrency from '../../utils/numberUtils';

import './style.css';

export default function Income() {
  const [showModal, setShowModal] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const cpf = getLocalStorageCpf();
  const idUser = getLocalStorageUserId();

  useEffect(() => {
    api.get(`/users/${cpf}`).then((response) => {
      setIncomes(response.data.incomes);
    });
  }, []);

  async function handleDeleteIncome(idIncome) {
    try {
      await api.delete(`/incomes/${idIncome}`);
      setIncomes(incomes.filter((income) => income.id !== idIncome));
    } catch (err) {
      alert('Erro ao deletar renda, tente novamente');
    }
  }

  async function handleAddIncome(income) {
    try {
      income.value = parseFloat(income.value);
      income.user_id = idUser;
      const response = await api.post(`/incomes/`, income);
      let currentIncomes = incomes;
      currentIncomes.push(response.data);
      setIncomes(currentIncomes);
      setShowModal(false);
    } catch (err) {
      alert('Erro ao adicionar renda, tente novamente');
    }
  }

  const getIncomeItem = (income) => {
    return (
      <CardWithRemoveButton
        id={income.id}
        header={income.description}
        description={`Valor: ${formatCurrency(income.value)}`}
        onClickRemoveItem={handleDeleteIncome}
      />
    );
  };

  const getModalIncome = () => {
    return (
      <ModalWithForm
        header='Adicionar renda'
        submitFunction={handleAddIncome}
        showModalFunction={setShowModal}
        showModal={showModal}
      />
    );
  };

  return (
    <div className='income-container'>
      {getModalIncome()}
      <Header />
      <HeaderWithAddButton
        title='Rendas'
        onClickAdd={(e) => setShowModal(true)}
      />
      <Container>
        <Card.Group>
          {incomes.map((income) => getIncomeItem(income))}
        </Card.Group>
      </Container>
    </div>
  );
}
