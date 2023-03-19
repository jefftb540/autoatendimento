import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import { clearErrors, validateEmptyFields } from '../../../utils/formValidate';

export default function Form() {
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/categories/${id}`);
      setName(data.name);
    }

    if (id) getData();
  }, [setName]);

  async function handleSubmit(e) {
    e.preventDefault();
    const messages = document.querySelectorAll('.error');
    clearErrors(messages);
    const fields = document.querySelectorAll('.input-container input');
    const validForm = validateEmptyFields(fields);

    if (validForm) {
      if (!id) {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/categories/`, { name });
          toast.success('Categoria cadastrada com sucesso');
          navigate('/admin/categories/');
        } catch (error) {
          toast.error('Erro desconhecido');
        }
      } else {
        try {
          await axios.put(`${process.env.REACT_APP_API_URL}/categories/${id}`, { name });
          toast.success('Categoria atualizada com sucesso');
          navigate('/admin/categories/');
        } catch (error) {
          toast.error('Erro desconhecido');
        }
      }
    }
  }
  return (
    <div className="admin-form-container">
      <div className="content-header">
        <h1>{id ? 'EDITAR CATEGORIA' : 'NOVa CATEGORIA'}</h1>

      </div>
      <form className="form" onSubmit={handleSubmit} action={id ? `${process.env.REACT_APP_API_URL}/categories/${id}` : `${process.env.REACT_APP_API_URL}/categories/`}>
        <div className="input-container">
          <label htmlFor="name">Nome da categoria:</label>
          <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
          <div className="hidden error" />
        </div>
        <div className="button-container"><button type="submit" className="submit">Enviar</button></div>
      </form>
    </div>
  );
}
