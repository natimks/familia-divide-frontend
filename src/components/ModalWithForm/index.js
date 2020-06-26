import React, { useState } from 'react';
import { Form, Button, Header, Modal } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input';

export const ModalWithForm = ({
  header,
  submitFunction,
  showModalFunction,
  showModal,
}) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [maskedValueExpense, setMaskedValueExpense] = useState('');

  const clearValuesCurrencyInput = () => {
    setValue(0);
    setMaskedValueExpense('');
  };

  return (
    <Modal
      as={Form}
      onSubmit={() => {
        submitFunction({ description, value });
        clearValuesCurrencyInput();
      }}
      open={showModal}
      size='tiny'
    >
      <Header content={header} as='h2' />
      <Modal.Content>
        <Form.Input
          label='Descrição'
          required
          type='text'
          placeholder='Descrição'
          onChange={(e) => setDescription(e.target.value)}
        />
        <CurrencyInput
          decimalSeparator=','
          thousandSeparator='.'
          prefix='R$ '
          value={maskedValueExpense}
          onChangeEvent={(e, maskedValue, flotValue) => {
            setMaskedValueExpense(maskedValue);
            setValue(flotValue);
          }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='red'
          icon='times'
          content='Fechar'
          onClick={(e) => {
            showModalFunction(false);
            clearValuesCurrencyInput();
          }}
        />
        <Button type='submit' color='green' icon='add' content='Adicionar' />
      </Modal.Actions>
    </Modal>
  );
};
