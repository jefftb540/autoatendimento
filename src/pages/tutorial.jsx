/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StepList from '../components/steplist/stepList';
import axios from '../services/axios';
import '../App.css';
import useInterval from '../hooks/use-interval';

function Tutorial() {
  const DEFAULT_TIMER = 45;
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [tutorial, setTutorial] = useState({ Steps: [] });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/tutorials/${id}`);

      setTutorial(data);
    }

    getData();
  }, [setTutorial]);

  const [currentPage, setCurrentPage] = useState(1);
  const [stepsForPage] = useState(6);

  const indexOfLastStep = currentPage * stepsForPage;
  const indexOfFirstStep = indexOfLastStep - stepsForPage;
  const currentPosts = tutorial.Steps.slice(indexOfFirstStep, indexOfLastStep);

  useInterval(() => {
    setTimer(timer - 1);
  }, [1000]);

  useEffect(() => {
    if (timer < 0) navigate('/');
  }, [timer, navigate]);
  const handleKeyPress = (event) => {
    setTimer(DEFAULT_TIMER);
    if (event.keyCode === 13) {
      if (currentPage < (tutorial.Steps.length / stepsForPage)) {
        setCurrentPage(currentPage + 1);
      } else {
        navigate('/');
      }
    }
  };
  return (
    <>
      <div className="hidden-input"><input type="text" autoFocus onBlur={(e) => e.target.focus()} onKeyDown={handleKeyPress} /></div>
      <StepList tutorial={currentPosts} pageNumber={currentPage} stepsForPage={stepsForPage} />
      <h1 className="next-page">Pressione enter para próxima página</h1>
    </>
  );
}

export default Tutorial;
