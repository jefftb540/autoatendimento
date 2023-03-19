import React from 'react';
import { Routes } from 'react-router-dom';
// import { Routes } from 'react-router-dom';
import Admin from '../admin/pages';
import Login from '../admin/pages/login/login';
import Home from '../pages/home';
import ExibirTutorial from '../pages/tutorial';
import MyRoute from './protectedRoute';

export default function routes() {
  return (
    <Routes>
      <MyRoute path="/" exact component={<Home />} />
      <MyRoute path="/admin/" exact component={<Admin />} />
      <MyRoute path="/admin/login" exact component={<Login />} />
      <MyRoute path="/tutorials/:id" exact component={<ExibirTutorial />} />
    </Routes>
  );
}
