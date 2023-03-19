/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import store, { persistor } from './store/index';
import Login from './admin/pages/login/login';
import Admin from './admin/pages';
import Home from './pages/home';
import history from './services/history';

import './App.css';

import Tutorial from './pages/tutorial';
import ProtectedRoute from './routes/protectedRoute';
import Category from './admin/pages/categories';
import TutorialAdm from './admin/pages/Tutorials';
import User from './admin/pages/users';
import CategoryForm from './admin/pages/categories/form';
import TutorialForm from './admin/pages/Tutorials/form';
import UserForm from './admin/pages/users/form';
import Detail from './admin/pages/Tutorials/detail';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/admin/login" exact element={<Login />} />
            <Route path="/admin/" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
              <Route path="categories" index element={<Category />} />
              <Route path="categories/form" element={<CategoryForm />} />
              <Route path="categories/form/:id" element={<CategoryForm />} />
              <Route path="tutorials/form/" element={<TutorialForm />} />
              <Route path="tutorials/form/:id" element={<TutorialForm />} />
              <Route path="tutorials" element={<TutorialAdm />} />
              <Route path="tutorials/:id" element={<Detail />} />
              <Route path="users" element={<User />} />
              <Route path="users/form/" element={<UserForm />} />
              <Route path="users/form/:id" element={<UserForm />} />
            </Route>
            <Route path="/tutorials/:id" exact element={<Tutorial />} />

          </Routes>
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
