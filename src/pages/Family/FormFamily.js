import React, { useState } from 'react';
import { Form, Button, Header, Modal } from 'semantic-ui-react';

export const FormFamily = ({
  submitFunction,
  showModalFunction,
  showModal,
}) => {
  const [email, setEmail] = useState('');
  return (
    <Modal
      as={Form}
      onSubmit={() => submitFunction(email)}
      open={showModal}
      size='tiny'
    >
      <Header content='Adicionar familiar' as='h2' />
      <Modal.Content>
        <Form.Input
          label='E-mail'
          required
          type='text'
          placeholder='Digite aqui'
          onChange={(e) => setEmail(e.target.value)}
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
