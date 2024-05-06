import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFilms } from "../features/movie/movieSlice";

const ListAllFilm = () => {
  const movies = useSelector(selectFilms);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [showRemainingGenres, setShowRemainingGenres] = useState(false);

  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  const toggleCategory = (category) => {
    if (isCategorySelected(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filterMoviesByCategories = () => {
    if (!movies || movies.length === 0) {
      return [];
    }
    if (selectedCategories.length === 0) {
      return movies;
    }
    return movies.filter((movie) => {
      if (!movie.filtr || !Array.isArray(movie.filtr)) {
        return false;
      }
      return selectedCategories.every((category) =>
        movie.filtr.includes(category)
      );
    });
  };


  const sortedMovies = [...filterMoviesByCategories()].sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    const dateA = new Date(
      parseInt(a.date.split("/")[2]),
      parseInt(a.date.split("/")[1]) - 1,
      parseInt(a.date.split("/")[0])
    );
    const dateB = new Date(
      parseInt(b.date.split("/")[2]),
      parseInt(b.date.split("/")[1]) - 1,
      parseInt(b.date.split("/")[0])
    );
    return dateB - dateA; // меняем местами dateA и dateB
  });
  

  const chooseRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * sortedMovies.length);
    setRandomMovie(sortedMovies[randomIndex]);
  };

  const remainingGenres = [
    "Экшн",
    "Триллер",
    "Фантастика",
    "Приключения",
    "Криминал",
    "Романтика",
    "Мистика",
    "Популярное"
  ].filter((genre) => !isCategorySelected(genre));

  const toggleShowRemainingGenres = () => {
    setShowRemainingGenres(!showRemainingGenres);
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => { setSelectedCategories([]); setRandomMovie(null); }}>Все фильмы</Button>
        <Button onClick={() => toggleCategory("Драма")} selected={isCategorySelected("Драма")}>
          Драма
        </Button>
        <Button onClick={() => toggleCategory("Комедия")} selected={isCategorySelected("Комедия")}>
          Комедия
        </Button>
        <Button onClick={() => toggleCategory("Ужасы")} selected={isCategorySelected("Ужасы")}>
          Ужасы
        </Button>
        {showRemainingGenres && (
          remainingGenres.map((genre) => (
            <Button key={genre} onClick={() => toggleCategory(genre)} selected={isCategorySelected(genre)}>
              {genre}
            </Button>
          ))
        )}
        {remainingGenres.length > 0 && (
          <Button onClick={toggleShowRemainingGenres}>
            {showRemainingGenres ? "Скрыть жанры" : "Ещё жанры"}
          </Button>
        )}
        <Button onClick={chooseRandomMovie}>Случайный</Button>
      </ButtonContainer>

      <Content>
        {randomMovie ? (
          <Wrap>
            <Link to={`/detail/${randomMovie.id}`}>
              <img src={randomMovie.cardImg} alt={randomMovie.title} />
            </Link>
          </Wrap>
        ) : (
          sortedMovies.map((movie, key) => (
            <Wrap key={key}>
              <Link to={`/detail/${movie.id}`}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </Wrap>
          ))
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  color: rgb(255, 255, 255);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  border-radius: 100px;
  padding: 6px 10px;
  background-color: ${({ selected }) => (selected ? "#3182ce" : "#424d64aa")};
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  margin: 0 5px 10px;
  border: 2px solid ${({ selected }) => (selected ? "#3182ce" : "#424d64aa")};
  transition: background-color 0.3s, border-color 0.3s;

  &.random {
    background-color: #fca311;
    border-color: #fca311;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default ListAllFilm;
