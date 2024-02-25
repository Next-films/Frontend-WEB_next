import styled from "styled-components";
import ImgSlider from "./ImgSliderAllFilms";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";


import disneyAllFilms from '../All.json'
import ListPixarUniverse from "./ListPixarUniverse";




const Films = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name );


  useEffect(() => {
    console.log("hello");

    dispatch(
      setMovies({
 
        pixar: disneyAllFilms.filter(film => film.universe === 'pixar'),
      })
    );

  }, [userName]);

  return (
    <Container>
      <ImgSlider />    
    <ListPixarUniverse />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  

  &:after {
    background: url("http://94.241.168.136/default/images/home-background.png") center center / 100% 100% no-repeat fixed;
    content: "";
    position: fixed;
    inset: 0px;
    opacity: 1;
    z-index: -1;
    
  }
`;


export default Films;