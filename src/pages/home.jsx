/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/menu/Menu';
import useInterval from '../hooks/use-interval';
import axios from '../services/axios';

export default function Home() {
  const navigate = useNavigate();
  const DEFAULT_TIMER = 45;
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState(categories);
  const [atHome, setAtHome] = useState(true);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('/categories/');
      setCategories(data);
      setMenu(data);
    }

    getData();
    // setMenu(categories);
  }, [setCategories]);

  const handleKeyPress = async (event) => {
    const numeroValido = menu.filter((item) => item.index.toString() === event.key);

    if (numeroValido.length > 0) {
      if (atHome) {
        setTimer(DEFAULT_TIMER);
        const { data } = await axios.get(`/categories/${numeroValido[0].id}`);
        setAtHome(false);
        setMenu(data.Tutorials);
      } else {
        navigate(`/tutorials/${numeroValido[0].id}`);
      }
    }
  };
  useEffect(() => {
    if (timer < 0 && !atHome) {
      setAtHome(true);
      setMenu(categories);
    }
  }, [timer, setAtHome, setMenu, categories, atHome]);

  useInterval(() => {
    setTimer(timer - 1);
  }, [1000]);
  return (
    <div className="App">
      <div className="header">
        <h1>
          OBSERVE AS OPÇÕES DE
          <span> AUTO ATENDIMENTO ABAIXO</span>
          {' '}
          ANTES DE SOLICITAR O ATENDIMENTO PESSOAL
        </h1>
      </div>
      <div className="hidden-input"><input type="text" autoFocus onBlur={(e) => e.target.focus()} onKeyDown={handleKeyPress} /></div>
      <Menu categories={menu} />
    </div>
  );
}
