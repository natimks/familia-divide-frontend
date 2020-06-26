import React, { useState } from 'react';
import { Form, Button, Header, Modal } from 'semantic-ui-react';

export const ModalExpense = ({
  submitFunction,
  showModalFunction,
  showModal,
}) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  return (
    <Modal
      as={Form}
      onSubmit={() => submitFunction({ description, value })}
      open={showModal}
      size='tiny'
    >
      <Header content='Adicionar renda' as='h2' />
      <Modal.Content>
        <Form.Input
          label='Descrição'
          required
          type='text'
          placeholder='Descrição'
          onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Input
          label='Valor'
          required
          type='number'
          placeholder=''
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='red'
          icon='times'
          content='Fechar'
          onClick={(e) => showModalFunction(false)}
        />
        <Button type='submit' color='green' icon='add' content='Adicionar' />
      </Modal.Actions>
    </Modal>
  );
};
