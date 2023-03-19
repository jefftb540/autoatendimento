import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../../../services/axios';

export default function Index() {
  const [tutorials, setTutorials] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('/tutorials/');
      setTutorials(data);
    }

    getData();
  }, []);

  async function handleDelete(e, id) {
    try {
      await axios.delete(`/tutorials/${id}`);
      toast.success('Tutorial deletado');
      e.target.parentElement.parentElement.remove();
    } catch (error) {
      toast.error('Erro ao deletar categoria');
    }
  }
  function hideConfirm(e) {
    e.target.parentElement.classList.add('hidden');
  }
  function toogleConfirm(e) {
    // e.target.parentElement.classList.remove('hidden');
    const confirmClassList = e.target.parentElement.parentElement.nextSibling.classList;
    if (confirmClassList.contains('hidden')) {
      confirmClassList.remove('hidden');
    } else {
      confirmClassList.add('hidden');
    }
  }
  return (
    <div className="main-content">
      <div className="content-header">
        <h1>TUTORIAIS</h1>
        <Link to="form/" className="add">Novo tutorial</Link>
      </div>
      <div className="item table-header">
        <div className="item-content">
          <div className="item-name">
            Tutorial
          </div>
          <div className="item-name">
            Categoria
          </div>
          <div className="edit-item">Ações</div>
        </div>
      </div>
      {tutorials.map((tutorial) => (
        <div key={tutorial.id} className="item">
          <div className="item-content">
            <div className="item-name">
              <Link to={`${tutorial.id}`}>{tutorial.name}</Link>
            </div>
            <div className="item-name">
              {tutorial.Category.name}
            </div>

            <div className="edit-item">
              <Link to={`form/${tutorial.id}`}>Editar</Link>
              <button type="button" onClick={toogleConfirm}>Excluir</button>
            </div>
          </div>
          <div className="confirm-delete hidden">
            Tem certeza que deseja excluir o tutorial
            &quot;
            {tutorial.name}
            &quot;

            <button type="button" onClick={(e) => handleDelete(e, tutorial.id)}>Confirmar</button>
            <button type="button" onClick={hideConfirm}>Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
