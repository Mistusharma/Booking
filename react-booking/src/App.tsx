
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './app/auth/signup';
import Login from './app/auth/login';
import Home from './app/dashboard/home';
import type React from 'react';
import ForgetPassword from './app/auth/forgetPassword';
import ResetPassword from './app/auth/resetPassword';

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/forget-password' element={<ForgetPassword/>}/>
  <Route path='/reset-password' element={<ResetPassword/>}/>

 </Routes>
 </BrowserRouter>
  );
}

export default App;
