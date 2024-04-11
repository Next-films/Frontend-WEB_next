import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from "./components/Header";
import Home from './components/Home';
import Detail from "./components/Detail";
import AllFilms from "./componentsTwo/AllFilms";
import AllSeries from "./componentsTwo/AllSeries";
import AllCartoons from "./componentsTwo/AllCartoons";
import SearchResults from './components/IssuedRequest';
import DetailSeries from "./componentsTwo/DetailSeries";
import MarvelUniverse from "./componentsThree/MarvelUniverse";
import StarWarsUniverse from "./componentsThree/StarWarsUniverse";
import DisneyUniverse from "./componentsThree/DisneyUniverse"; // corrected filename
import PixarUniverse from "./componentsThree/PixarUniverse";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      {/*   <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/allfilms" element={<AllFilms />} />
        <Route path="/allseries" element={<AllSeries />} />
        <Route path="/detailseries/:id" element={<DetailSeries />} />
        <Route path="/allcartoons" element={<AllCartoons />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/marveluniverse" element={<MarvelUniverse />} />
        <Route path="/starwarsuniverse" element={<StarWarsUniverse />} />
        <Route path="/disneyuniverse" element={<DisneyUniverse />} /> {/* corrected import */}
        <Route path="/pixaruniverse" element={<PixarUniverse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
