import React from 'react';
import LoginPage from './components/loginPage/loginPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ContactsList from './components/contactsList/contactsList';
import { fetchData } from './state/actions';
import { useTypedDispatch } from './state/store';
import { useSelector } from "react-redux";
import { IRootReducer } from "./state/reducer"

function App() {
  const dispatch = useTypedDispatch();
  dispatch(fetchData());
  const authState = useSelector<IRootReducer, boolean>(state => state.authToggle.isAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/contacts' element={authState ? <ContactsList /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
