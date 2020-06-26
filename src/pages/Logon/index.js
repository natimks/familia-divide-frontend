import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/text-logo.png';
import logo from '../../assets/logo.png';

import './style.css';

export default function Logon() {
  const [cpf, setCpf] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.get(`/users/${cpf}`);
      localStorage.setItem('cpf', cpf);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('name', response.data.name);

      console.log(response);
      history.push('/dashboard');
    } catch (err) {
      alert('Falha no login, tente novamente');
    }
  }
  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='Família Divide'></img>
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            placeholder='CPF'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          ></input>
          <button className='button-primary' type='submit'>
            Entrar
          </button>
          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#fca434' />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={logo} alt='Logo Família Divide' />
    </div>
  );
}
