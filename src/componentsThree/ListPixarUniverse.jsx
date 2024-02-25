import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPixar } from "../features/movie/movieSlice";

const ListMarvelUniverse = () => {
  const movies = useSelector(selectPixar);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null); // Состояние для хранения случайного фильма

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
      return selectedCategories.every(category => movie.filtr.includes(category));
    });
  };

  const sortedMovies = [...filterMoviesByCategories()].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // сортировка по убыванию даты
  });

  // Функция для выбора случайного фильма
  const chooseRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * sortedMovies.length);
    setRandomMovie(sortedMovies[randomIndex]);
  };

  return (
    <Container>
      <ButtonContainer>
        <ButtonContainerInner>
          <Button onClick={() => {setSelectedCategories([]); setRandomMovie(null);}}>All Films</Button>
          <Button
            onClick={() => toggleCategory("comedy")}
            selected={isCategorySelected("comedy")}
          >
            Comedy
          </Button>
          <Button        
            onClick={() => toggleCategory("drama")}
            selected={isCategorySelected("drama")}
          >
            Drama
          </Button>
          {/* Кнопка "Рандом" */}
          <Button onClick={chooseRandomMovie}>Random</Button>
        </ButtonContainerInner>
      </ButtonContainer>

      <Content>
        {randomMovie ? ( // Проверяем, есть ли выбранный случайный фильм
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
  padding: 0 0 26px;
  color: rgb(255, 255, 255);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  margin-bottom: 10px; /* Добавлен отступ снизу */
`;

const ButtonContainerInner = styled.div`
  display: flex;
  margin: 10px; /* Добавлен отступ сверху и снизу */
  margin-top: 40px;
`;

const Button = styled.button`
  border-radius: 100px;
  padding: 6px 10px; /* Adjusted padding */
  background-color: ${({ selected }) => (selected ? "#3182ce" : "#424d64aa")};
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
  border: 2px solid ${({ selected }) => (selected ? "#3182ce" : "#424d64aa")}; /* Added border */
  transition: background-color 0.3s, border-color 0.3s; /* Added transition for smooth effect */

  /* Добавляем стили для кнопки "Рандом" */
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

export default ListMarvelUniverse;
