/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StepList from '../components/steplist/stepList';

function ExibirTutorial() {
  const navigate = useNavigate();

  const params = useParams();
  console.log(tutoriais);
  console.log(params);
  const tutorial = tutoriais.filter((t) => t.id === params.id);

  console.log(tutorial);

  const [currentPage, setCurrentPage] = useState(1);
  const [passosPorPagina] = useState(6);

  const indexOfLastPost = currentPage * passosPorPagina;
  const indexOfFirstPost = indexOfLastPost - passosPorPagina;
  const currentPosts = tutorial[0].passos.slice(indexOfFirstPost, indexOfLastPost);

  const handleKeyPress = (event) => {
    console.log(event);
    if (event.keyCode === 13) {
      if (currentPage < (tutorial[0].passos.length / passosPorPagina)) {
        setCurrentPage(currentPage + 1);
      } else {
        navigate('/');
      }
    }
  };
  return (
    <>
      <div className="hidden-input"><input type="text" autoFocus onKeyDown={handleKeyPress} /></div>
      <StepList tutorial={currentPosts} />
    </>
  );
}

export default ExibirTutorial;
