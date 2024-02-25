import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecommend } from "../features/movie/movieSlice";

const Recommends = () => {
  const movies = useSelector(selectRecommend);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container>
      <h4>Films</h4>
      <Content>
        {movies &&
          movies.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={`/detail/` + movie.id}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </Wrap>
          ))}
        <Link to="/allfilms">
          <Wrap
            className="larger-wrap"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src="http://94.241.168.136/default/images/AllFilms.png" alt="" />
            <Video
              autoPlay={true}
              loop={true}
              playsInline={true}
              src="http://94.241.168.136/default/video/AllFilms.mp4"
              type="video/mp4"
              isVisible={isHovered}
            />
          </Wrap>
        </Link>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
  color: rgb(255, 255, 255);
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
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
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

  &.larger-wrap {
    width: 100%;
    padding-top: 66.66%;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 0;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transition: opacity 0.3s ease;
`;

export default Recommends;
