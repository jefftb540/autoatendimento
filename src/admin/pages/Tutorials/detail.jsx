import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../services/axios';

export default function Detail() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState({});
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/tutorials/${id}`);
      console.log(data);
      setTutorial(data);
      setSteps(data.Steps);
    }

    if (id) getData();
  }, [setTutorial, setSteps]);

  return (
    <div className="main-content">
      <div className="content-header">
        <h1>{tutorial.name}</h1>
        <Link to={`/admin/tutorials/form/${id}`} className="add">Editar</Link>
      </div>
      {steps.map((step, index) => (
        <div className="item">
          <div className="item-content">
            {`Passo ${index + 1}: ${step.step}`}
          </div>
        </div>

      ))}
    </div>
  );
}
