import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Viewers = (props) => {
  return (
    <Container>
      <Link to="/disneyuniverse">
        <Wrap>
          <img src="http://5.144.98.17:8080/d1/default/images/viewers-disney.png" alt="" />
          <VideoWrapper>
            <video autoPlay={true} loop={true} playsInline={true} muted={true}>
              <source src="http://5.144.98.17:8080/d1/default/video/1564674844-disney.mp4" type="video/mp4" />
            </video>
          </VideoWrapper>
        </Wrap>
      </Link>
      <Link to="/pixaruniverse">
        <Wrap>
          <img src="http://5.144.98.17:8080/d1/default/images/viewers-pixar.png" alt="" />
          <VideoWrapper>
            <video autoPlay={true} loop={true} playsInline={true} muted={true}>
              <source src="http://5.144.98.17:8080/d1/default/video/1564676714-pixar.mp4" type="video/mp4" />
            </video>
          </VideoWrapper>
        </Wrap>
      </Link>
      <Link to="/marveluniverse">
        <Wrap>
          <img src="http://5.144.98.17:8080/d1/default/images/viewers-marvel.png" alt="" />
          <VideoWrapper>
            <video autoPlay={true} loop={true} playsInline={true} muted={true}>
              <source src="http://5.144.98.17:8080/d1/default/video/1564676115-marvel.mp4" type="video/mp4" />
            </video>
          </VideoWrapper>
        </Wrap>
      </Link>
      <Link to="/starwarsuniverse">
        <Wrap>
          <img src="http://5.144.98.17:8080/d1/default/images/viewers-starwars.png" alt="" />
          <VideoWrapper>
            <video autoPlay={true} loop={true} playsInline={true} muted={true}>
              <source src="http://5.144.98.17:8080/d1/default/video/1608229455-star-wars.mp4" type="video/mp4" />
            </video>
          </VideoWrapper>
        </Wrap>
      </Link>
      <Link to="/allseries">
        <Wrap>
          <img src="http://5.144.98.17:8080/d1/default/images/dc.png" alt="" />
          <VideoWrapper>
            <video autoPlay={true} loop={true} playsInline={true} muted={true}>
              <source src="http://5.144.98.17:8080/d1/default/video/dcintro.mp4" type="video/mp4" />
            </video>
          </VideoWrapper>
        </Wrap>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
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
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;

    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Wrap}:hover & {
    opacity: 1;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${Wrap}:hover video {
    opacity: 1;
  }
`;

export default Viewers;
