/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as actions from '../../../store/modules/auth/actions';
import './login.css';
import { clearErrors, validateEmptyFields, showError } from '../../../utils/formValidate';

export default function Login() {
  const [ifrnId, setIfrnId] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/');
    }
  }, [isLoggedIn, navigate]);

  const dispatch = useDispatch();
  let validForm = true;

  // function showError(input, msg) {
  //   const nextSibiling = input.nextElementSibling;
  //   nextSibiling.classList.remove('hidden');
  //   nextSibiling.innerHTML += `${msg}<br />`;
  // }

  // function clearErrors() {
  //   messages.forEach((message) => {
  //     message.classList.add('hidden');
  //     // eslint-disable-next-line no-param-reassign
  //     message.innerHTML = '';
  //   });
  // }

  // function validateEmptyFields() {
  //   fields.forEach((field) => {
  //     if (field.value === '') {
  //       showError(field, 'O campo não pode estar em branco');
  //       validForm = false;
  //     }
  //   });
  // }

  function validateIfrnId() {
    const input = document.querySelector('#ifrn_id');
    if (Number.isNaN(Number(ifrnId))) {
      showError(input, 'Matrícula só pode conter números');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const messages = document.querySelectorAll('.error');
    clearErrors(messages);
    const fields = document.querySelectorAll('.form-container form input');
    validForm = validateEmptyFields(fields);
    validateIfrnId();

    if (validForm) {
      dispatch(actions.loginRequest({ ifrn_id: ifrnId, password, path: '/admin/' }));
    }
  }
  return (
    <div className="login-container">
      <div className="form-container">

        <form action={`${process.env.REACT_APP_API_URL}/tokens/`} onSubmit={handleSubmit}>
          <div className="logo">
            <img id="logo-img" src="/logo.png" alt="logotipo do IFRN" />
          </div>
          <label htmlFor="ifrn_id">
            Matrícula
          </label>
          <input type="text" name="ifrn_id" value={ifrnId} onChange={(e) => setIfrnId(e.target.value.replace(/\D/g, ''))} id="ifrn_id" />
          <div className="error hidden" />
          <br />
          <label htmlFor="password">
            Senha
          </label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" />
          <div className="error hidden" />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
