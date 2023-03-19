import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import { clearErrors, validateEmptyFields, showError } from '../../../utils/formValidate';

export default function Form() {
  const [name, setName] = useState('');
  const [ifrnId, setIfrnId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/users/${id}`);
      setName(data.name);
      setIfrnId(data.ifrn_id);
    }

    if (id) getData();
  }, [setName, setIfrnId]);

  function validatePassword() {
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirm-password');
    if (password !== confirmPassword) {
      showError(passwordInput, 'As senhas precisam ser iguais');
      showError(confirmPasswordInput, 'As senhas precisam ser iguais');
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const messages = document.querySelectorAll('.error');
    clearErrors(messages);
    const fields = document.querySelectorAll(id ? '.validate' : '.input-container input');
    const validForm = validateEmptyFields(fields);
    const validPassword = validatePassword();

    if (validForm && validPassword) {
      if (!id) {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/users/`, { name, password, ifrn_id: ifrnId });
          toast.success('Usuário cadastrado com sucesso');
          navigate('/admin/users/');
        } catch (error) {
          toast.error('Erro desconhecido');
        }
      } else {
        try {
          await axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`, { name, password: password || null, ifrn_id: ifrnId });
          toast.success('Usuário atualizado com sucesso');
          navigate('/admin/users/');
        } catch (error) {
          toast.error('Erro desconhecido');
        }
      }
    }
  }
  return (
    <div className="admin-form-container">
      <div className="content-header">
        <h1>{id ? 'EDITAR USUÁRIO' : 'NOVO USUÁRIO'}</h1>

      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="label-container">
            <label htmlFor="name">Nome:</label>
          </div>
          <div className="input-inner">
            <input className="validate" type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
            <div className="hidden error" />
          </div>
        </div>
        <div className="input-container">
          <div className="label-container">
            <label className="validate" htmlFor="name">Matrícula:</label>
          </div>
          <div className="input-inner">
            <input type="text" name="name" value={ifrnId} id="name" onChange={(e) => setIfrnId(e.target.value.replace(/\D/g, ''))} />
            <div className="hidden error" />
          </div>
        </div>
        <div className="input-container">
          <div className="label-container">
            <label htmlFor="name">Senha:</label>
          </div>
          <div className="input-inner">
            <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="hidden error" />
          </div>
        </div>
        <div className="input-container">
          <div className="label-container">
            <label htmlFor="name">Confirmar senha:</label>
          </div>
          <div className="input-inner">
            <input id="confirm-password" type="password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <div className="hidden error" />
          </div>
        </div>
        <div className="button-container"><button type="submit" className="submit">Enviar</button></div>
      </form>
    </div>
  );
}
