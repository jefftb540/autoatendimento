import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';

export default function Index() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('/categories/');
      setCategories(data);
    }

    getData();
  }, []);

  async function handleDelete(e, id) {
    try {
      await axios.delete(`/categories/${id}`);
      toast.success('Categoria deletada');
      e.target.parentElement.parentElement.remove();
    } catch (error) {
      toast.error('Erro ao deletar categoria');
    }
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

  function hideConfirm(e) {
    e.target.parentElement.classList.add('hidden');
  }
  return (
    <div className="main-content">
      <div className="content-header">
        <h1>CATEGORIAS</h1>
        <Link to="form/" className="add">Nova Categoria</Link>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="item">
          <div className="item-content">
            <div className="item-name">
              {category.name}
            </div>
            <div className="edit-item">
              <Link to={`form/${category.id}`}>Editar</Link>
              <button type="button" onClick={toogleConfirm}>Excluir</button>
            </div>
          </div>
          <div className="confirm-delete hidden">
            Tem certeza que deseja excluir a categoria
            {' '}
            {category.name}
            {' '}
            <button type="button" onClick={(e) => handleDelete(e, category.id)}>Confirmar</button>
            <button type="button" onClick={hideConfirm}>Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
