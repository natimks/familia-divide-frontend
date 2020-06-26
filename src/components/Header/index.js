import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';

import logoImg from '../../assets/logo.png';

import './style.css';

function handleLogout(history) {
  localStorage.clear();
  history.push('/');
}

const Header = () => {
  const history = useHistory();
  return (
    <Container>
      <Menu stackable>
        <Link to='/dashboard'>
          <Menu.Item>
            <img src={logoImg} alt="Logo Familia Divide"/>
          </Menu.Item>
        </Link>
        <Link className='button-header' to='/despesas'>
          <Menu.Item>Despesas</Menu.Item>
        </Link>
        <Link className='button-header' to='/rendas'>
          <Menu.Item>Rendas</Menu.Item>
        </Link>
        <Link className='button-header' to='/familia'>
          <Menu.Item>Minha família</Menu.Item>
        </Link>
        <Menu.Item position='right' onClick={() => handleLogout(history)}>
          Sair
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Header;
