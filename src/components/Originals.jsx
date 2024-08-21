import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOriginal } from "../features/movie/movieSlice";

const Originals = () => {
  const movies = useSelector(selectOriginal);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleMobileTouchStart = () => {
    setIsHovered(true);
    setIsVideoPlaying(true);
  };

  const handleMobileTouchEnd = () => {
    setIsHovered(false);
    setIsVideoPlaying(false);
  };

  return (
    <Container>
      <h4>Cartoons</h4>
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
        <Link to="/allcartoons">
          <Wrap
            className="larger-wrap"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleMobileTouchStart}
            onTouchEnd={handleMobileTouchEnd}
          >
            <img src="http://5.144.98.17:8080/d1/default/images/allcartoonslogo.png" alt="" />
            <VideoWrapper isVisible={isHovered || isVideoPlaying}>
              <video autoPlay={true} loop={true} playsInline={true} muted={true}>
                <source src="http://5.144.98.17:8080/d1/default/videos/allcartoons.mp4" type="video/mp4" />
              </video>
            </VideoWrapper>
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
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
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
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;

    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }

  &.larger-wrap {
    width: 100%;
    padding-top: 66.66%;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transition: opacity 0.3s ease;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
  }

  ${({ isVisible }) =>
    isVisible &&
    `
    video {
      opacity: 1;
    }
  `}
`;

export default Originals;
