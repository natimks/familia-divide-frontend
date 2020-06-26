import React, { useEffect, useState } from 'react';
import { Container, Card } from 'semantic-ui-react';

import Header from '../../components/Header';
import HeaderWithAddButton from '../../components/HeaderWithAddButton';
import CardWithRemoveButton from '../../components/CardWithRemoveButton';
import { FormFamily } from './FormFamily';

import api from '../../services/api';

import { getLocalStorageCpf } from '../../utils/storageUtils';

import './style.css';

export default function Family() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState('');
  const [family, setFamily] = useState([]);
  const cpf = getLocalStorageCpf();

  useEffect(() => {
    api.get(`/users/${cpf}`).then((response) => {
      setUser(response.data);
      setFamily(response.data.users_family);
    });
  }, [cpf]);

  async function handleDeleteRelative(idRelative) {
    try {
      await api.delete(`/family/${user.id}/${idRelative}`);
      setFamily(family.filter((relative) => relative.id !== idRelative));
    } catch (err) {
      alert('Erro ao deletar familiar, tente novamente');
    }
  }

  async function handleAddFamily(email) {
    try {
      const response = await api.put(`/family/${cpf}/${email}`);
      const newRelative = response.data;
      let currentFamily = family;
      currentFamily.push(newRelative);
      setFamily(currentFamily);
      setShowModal(false);
    } catch (err) {
      alert('Erro ao adicionar familiar, tente novamente');
    }
  }

  const getRelativeItem = (relative) => {
    return (
      <CardWithRemoveButton
        id={relative.id}
        header={relative.name}
        description={`E-mail: ${relative.email}`}
        onClickRemoveItem={handleDeleteRelative}
      />
    );
  };

  const getModalFamily = () => {
    return (
      <FormFamily
        submitFunction={handleAddFamily}
        showModalFunction={setShowModal}
        showModal={showModal}
      />
    );
  };

  return (
    <div className='family-container'>
      {getModalFamily()}
      <Header />
      <HeaderWithAddButton
        title='Familiares'
        onClickAdd={(e) => setShowModal(true)}
      />
      <Container>
        <Card.Group>
          {family.map((relative) => getRelativeItem(relative))}
        </Card.Group>
      </Container>
    </div>
  );
}
