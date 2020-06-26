import React from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

function HeaderWithAddButton({ title, onClickAdd }) {
  return (
    <Grid>
      <Grid.Column computer={2} mobile={7} tablet={3}>
        <h1 className='title'>{title}</h1>
      </Grid.Column>
      <Grid.Column computer={3} mobile={4} tablet={4}>
        <Button className='title' color='green' animated='vertical' onClick={onClickAdd}>
          <Button.Content hidden>Adicionar</Button.Content>
          <Button.Content visible>
            <Icon name='add' />
          </Button.Content>
        </Button>
      </Grid.Column>
    </Grid>
  );
}

export default HeaderWithAddButton;
