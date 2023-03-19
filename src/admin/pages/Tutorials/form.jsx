/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../../../services/axios';
import { clearErrors, validateEmptyFields } from '../../../utils/formValidate';

export default function Form() {
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [storedSteps, setStoredSteps] = useState([]);

  // const [stepCount, setStepCount] = useState(2);

  // const [steps, setSteps] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('/categories/');
      setCategories(data);
    }

    getData();
  }, []);

  function updateStepCount() {
    const labels = Array.from(document.querySelectorAll('.step-label'));
    console.log(labels);
    labels.forEach((label, index) => {
      const newHTML = label.innerHTML.replace(/\d+/g, `${index + 1}`);
      label.innerHTML = newHTML;
    });
  }

  function updateIds() {
    const inputs = Array.from(document.querySelectorAll('input.steps'));
    inputs.forEach((input, index) => {
      input.id = index;
    });
  }

  function removeStepInput(e) {
    if (Array.from(document.querySelectorAll('.step-label')).length > 1) {
      e.target.parentElement.remove();
      updateStepCount();
    } else {
      toast.warn('Deve haver pelo menos um passo no tutorial');
    }
  }

  function handleStepChange(e) {
    const newSteps = [...storedSteps];
    newSteps[e.target.id].step = e.target.value;
    setStoredSteps(newSteps);
  }

  function addStepInput(stepDiv) {
    const newStep = stepDiv.cloneNode(true);
    const addButton = newStep.querySelector('.add-step');
    const removeButton = newStep.querySelector('.remove-step');
    const input = newStep.querySelector('input');
    input.value = '';
    input.id = stepDiv.querySelector('input').id + 1;
    if (id) {
      setStoredSteps([...storedSteps, { step: input.value, id: storedSteps.at(-1).id + 1 }]);
      input.addEventListener('change', handleStepChange);
      updateIds();
    } else {
      stepDiv.parentElement.append(newStep);
    }
    addButton.addEventListener('click', (e) => addStepInput(e.target.parentElement));
    removeButton.addEventListener('click', removeStepInput);
    updateStepCount();
  }

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/tutorials/${id}`);
      setName(data.name);
      setCategoryId(data.Category.id);
      setStoredSteps(data.Steps);
    }

    if (id) getData();
  }, [setName, setStoredSteps]);

  // useEffect(() => {
  //   const container = document.querySelector('.steps-container .input-container');
  //   // container.value = storedSteps[0].step;
  //   storedSteps.forEach((step) => {
  //     addStepInput(container, step.step);
  //   });
  //   // container.remove();
  //   updateStepCount();
  // }, [storedSteps]);

  async function handleSubmit(e) {
    e.preventDefault();
    const messages = document.querySelectorAll('.error');
    clearErrors(messages);
    const fields = document.querySelectorAll('.input-container input, select');

    const validForm = validateEmptyFields(fields);

    if (validForm) {
      const stepsInputs = Array.from(document.querySelectorAll('.steps'));
      const Steps = stepsInputs.map((input) => ({ step: input.value }));
      if (!id) {
        try {
          await axios.post(
            `${process.env.REACT_APP_API_URL}/tutorials/`,
            { name, category_id: categoryId, Steps },
          );
          toast.success('Tutorial cadastrado com sucesso');
          navigate('/admin/tutorials/');
        } catch (error) {
          toast.error('Erro desconhecido');
        }
      } else {
        try {
          await axios.put(`${process.env.REACT_APP_API_URL}/tutorials/${id}`, { name, category_id: categoryId, Steps });
          toast.success('Tutorial atualizado com sucesso');
          navigate('/admin/tutorials/');
        } catch (error) {
          toast.error('Erro desconhecido');
        }
      }
    }
  }
  return (
    <div className="admin-form-container">
      <div className="content-header">
        <h1>{id ? 'EDITAR TUTORIAL' : 'NOVO TUTORIAL'}</h1>

      </div>
      <form className="form" onSubmit={handleSubmit} action={id ? `${process.env.REACT_APP_API_URL}/categories/${id}` : `${process.env.REACT_APP_API_URL}/categories/`}>
        <div className="input-container">
          <div className="label-container">
            <label htmlFor="name">Categoria:</label>
          </div>
          <div className="input-inner">
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <div className="hidden error" />

          </div>
        </div>
        <div className="input-container">
          <div className="label-container">
            <label htmlFor="name">Título:</label>
          </div>
          <div className="input-inner">
            <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
            <div className="hidden error" />
          </div>
        </div>
        <div className="steps-container">
          {storedSteps.length > 0 ? storedSteps.map((step, index) => (
            <div key={step.id} className="input-container">
              <div className="label-container">
                <label htmlFor="name" className="step-label">
                  Passo
                  {' '}
                  {index + 1}
                  :
                </label>
              </div>
              <div className="input-inner">
                <input type="text" className="steps" id={index} value={step.step} onChange={handleStepChange} name="name" />
                <div className="hidden error" />
              </div>
              <button type="button" className="add-step" onClick={(e) => addStepInput(e.target.parentElement)}>+</button>
              <button type="button" className="remove-step" onClick={removeStepInput}>-</button>
            </div>
          )) : (
            <div className="input-container">
              <div className="label-container">
                <label htmlFor="name" className="step-label">Passo 1:</label>
              </div>
              <div className="input-inner">

                <input type="text" className="steps" name="name" id="name" />
                <div className="hidden error" />
              </div>
              <button type="button" className="add-step" onClick={(e) => addStepInput(e.target.parentElement)}>+</button>
              <button type="button" className="remove-step" onClick={removeStepInput}>-</button>
            </div>
          )}

        </div>
        <div className="button-container"><button type="submit" className="submit">Enviar</button></div>
      </form>
    </div>
  );
}
