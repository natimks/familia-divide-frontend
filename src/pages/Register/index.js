import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/text-logo.png';
import './style.css';

export default function Register() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      cpf,
      email,
      phone,
    };

    await api
      .post('/users/', data)
      .then((response) => {
        alert(`Cadastrado com sucesso!`);
        history.push('/');
      })
      .catch((err) => {
        alert('Erro no cadastro, tente novamente');
      });
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Família Divide'></img>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e planeje seus gastos</p>
          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='	#fca434' />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder='Nome'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder='CPF'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Celular'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className='button' type='submit'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
