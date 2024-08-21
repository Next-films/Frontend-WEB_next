import styled from "styled-components";
import ImgSlider from "../components/ImgSlider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";



import disneyAllSeries from '../All.json'

import ListAllSeries from "./ListAllSeries";




const Films = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name );


  useEffect(() => {
    console.log("hello");

    dispatch(
      setMovies({
 
        series: disneyAllSeries.filter(series => series.type === 'series'),
      })
    );

  }, [userName]);

  return (
    <Container>
      <ImgSlider />    
    <ListAllSeries />
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
    background: url("http://5.144.98.17:8080/d1/default/images/home-background.png") center center / 100% 100% no-repeat fixed;
    content: "";
    position: fixed;
    inset: 0px;
    opacity: 1;
    z-index: -1;
    
  }
`;


export default Films;