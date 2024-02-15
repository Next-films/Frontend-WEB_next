import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from "./components/Header";
import Home from './components/Home';
import Detail from "./components/Detail";
import AllFilms from "./componentsTwo/AllFilms";
import AllSeries from "./componentsTwo/AllSeries";
import AllCartoons from "./componentsTwo/AllCartoons";
import SearchResults from './components/IssuedRequest'



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/allfilms" element={<AllFilms />} />
        <Route path="/allseries" element={<AllSeries />} />
        <Route path="/allcartoons" element={<AllCartoons />} />
        <Route path="/results" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
