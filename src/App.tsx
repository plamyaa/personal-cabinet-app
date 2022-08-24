import React from 'react';
import LoginPage from './components/loginPage/loginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactsList from './components/contactsList/contactsList';
import { fetchData } from './state/actions';
import { useTypedDispatch } from './state/store';

function App() {
  const dispatch = useTypedDispatch();
  dispatch(fetchData());
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/contacts' element={<ContactsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
