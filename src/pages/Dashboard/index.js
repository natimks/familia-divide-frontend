import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import Header from '../../components/Header';
import PieChartModel from '../../components/PieChartModel';

import { getPieCharStruct } from '../../controller/dashboardController';

import { getLocalStorageUserId } from '../../utils/storageUtils';
import formatCurrency from '../../utils/numberUtils';
import api from '../../services/api';

import './style.css';

export default function Profile() {
  const [user, setUser] = useState('');
  const [userDataToPieChart, setUserDataToPieChart] = useState([]);
  const idUserAdmin = getLocalStorageUserId();

  useEffect(() => {
    api.get(`/dashboard/${idUserAdmin}`).then(({ data }) => {
      setUser(data);
      setUserDataToPieChart(getPieCharStruct(data));
    });
  }, []);

  return (
    <div className='dashboard-container'>
      <Header />
      <h1 className='title'>Dashboard</h1>

      <Grid columns={2} container divided stackable>

        <Grid.Row>

          <Grid.Column>
            <Segment>
              <strong>Valor restante disponível:</strong>
              <p>{formatCurrency(user.remaining_amount)}</p>
              <strong>Valor para poupar:</strong>
              <p>{formatCurrency(user.savings_amount)}</p>
              <strong>Valor para despesas variáveis:</strong>
              <p>{formatCurrency(user.extra_expenses_amount)}</p>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <strong>
                Contribuição da família necessária para as contas:
              </strong>
              <PieChartModel data={userDataToPieChart} />
            </Segment>
          </Grid.Column>
          
        </Grid.Row>

      </Grid>
    </div>
  );
}
