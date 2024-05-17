import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";


import disneyFilms from '../disneyPlusMoviesData.json'


const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name );
  // const { recommend, newDisney, original, trending } = useSelector((movie) => state.movie)
  // let recommends = [];
  // let newDisneys = [];
  // let originals = [];
  // let trending = [];

  useEffect(() => {
    console.log("hello");
    // db.collection("movies").onSnapshot((snapshot) => {
    //   snapshot.docs.map((doc) => {
    //     console.log(recommends);
    //     switch (doc.data().type) {
    //       case "recommend":
    //         recommends = [...recommends, { id: doc.id, ...doc.data() }];
    //         break;

    //       case "new":
    //         newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
    //         break;

    //       case "original":
    //         originals = [...originals, { id: doc.id, ...doc.data() }];
    //         break;

    //       case "trending":
    //         trending = [...trending, { id: doc.id, ...doc.data() }];
    //         break;
    //     }
    //   });

    //   dispatch(
    //     setMovies({
    //       recommend: recommends,
    //       newDisney: newDisneys,
    //       original: originals,
    //       trending: trending,
    //     })
    //   );
    // });

    // запись из json в стор редакса
    dispatch(
      setMovies({
        recommend: disneyFilms.filter(film => film.type === 'recommend'),
        newDisney: disneyFilms.filter(film => film.type === 'new'),
        original: disneyFilms.filter(film => film.type === 'original'),
        trending: disneyFilms.filter(film => film.type === 'trending'),
      })
    );

  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />

      {/* <Trending /> */}
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
    background: url("https://94.241.168.136/default/images/home-background.png") center center / 100% 100% no-repeat fixed;
    content: "";
    position: fixed;
    inset: 0px;
    opacity: 1;
    z-index: -1;

  }
`;


export default Home;
