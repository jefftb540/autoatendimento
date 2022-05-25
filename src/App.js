import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Tutoriais from './exibirTutorial'
import background from './img/bg.jpg'

import './App.css';
import MenuItem from './MenuItem';
import Menu from './Menu';
import ExibirTutorial from './exibirTutorial';

function App() {   
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/tutorial/:id" exact element={<ExibirTutorial />} />
        

      </Routes>   
    </Router>
    
  );
}

const Home = () =>{
  const navigate = useNavigate();
  const menu = [
    {
      id: '1',
      titulo:'Wi-fi'
    },
    {
      id: '2',
      titulo:'Criar e-mail acadêmico/institucional'
    },
    {
      id: '3',
      titulo:'Alterar senha do SUAP'
    },
    {
      id: '4',
      titulo:'Requisitar equipamento'
    },
    {
      id: '5',
      titulo:'Informar defeito ou mal funcionamento'
    },
];

  const handleKeyPress = (event) => {
    const numeroValido =  menu.filter((tutorial) => tutorial.id === event.key); 
    
    if (numeroValido.length >0){
      navigate(`/tutorial/${event.key}`)
    }
  }
  return(
  <div  className="App">
    <div className='header'>
      <h1>OBSERVE AS OPÇÕES DE <span>AUTO ATENDIMENTO ABAIXO</span> ANTES DE SOLICITAR O ATENDIMENTO PESSOAL</h1>
    </div>
    <div className='hidden-input'><input type='text' autoFocus onKeyDown={handleKeyPress}></input></div>
    <Menu itens={menu} />
  </div>
);
}

export default App;
