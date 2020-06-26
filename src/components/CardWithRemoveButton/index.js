import React from 'react';
import { Button, Card } from 'semantic-ui-react';

function CardWithRemoveButton({ id, header, description, onClickRemoveItem }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red' onClick={() => onClickRemoveItem(id)}>
            Remover
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default CardWithRemoveButton;
