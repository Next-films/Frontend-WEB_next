import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import disneyFilms from '../disneyPlusMoviesData';
import All from '../All';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px; /* Расстояние от края экрана до содержимого */
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
  }
`;

const ImageTitle = styled.div`
  position: relative;
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    position: absolute;
    bottom: 20px;
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    img {
      position: static;
      bottom: auto;
      margin-top: 30%;
    }
  }
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContentMeta = styled.div`
  /* Add your styles here */
`;

const VideoWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;

  cursor: grab;
  user-select: none;
`;

const Video = styled.video`
  width: 350px;
  margin-right: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 250px;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const videoWrapperRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  useEffect(() => {
    if (id) {
      const disneyFilm = disneyFilms.find(film => film.id === id);
      const allFilm = All.find(film => film.id === id);
      const films = disneyFilm ? [disneyFilm] : [];
      if (allFilm && !films.some(film => film.id === allFilm.id)) {
        films.push(allFilm);
      }
      setDetailData(films[0]);
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isDragging && videoWrapperRef.current) {
        setScrollPosition(videoWrapperRef.current.scrollLeft);
      }
    };

    if (videoWrapperRef.current) {
      videoWrapperRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (videoWrapperRef.current) {
        videoWrapperRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isDragging]);

  const handleMouseDown = event => {
    setIsDragging(true);
    setDragStartX(event.clientX);
    setScrollStartX(videoWrapperRef.current.scrollLeft);
  };

  const handleMouseMove = event => {
    if (!isDragging) return;
    const dragDistance = event.clientX - dragStartX;
    videoWrapperRef.current.scrollLeft = scrollStartX - dragDistance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleVideo = () => {
    if (detailData.films && detailData.films.length > 0 && !showVideo) {
      setShowVideo(true);
    } else {
      setShowVideo(prevState => !prevState);
    }
  };

  const clickTrailer = () => {
    window.open(detailData.trailer, '_blank');
  };

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>

      <ImageTitle>
        <img alt={detailData.title} src={detailData.titleImg} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player onClick={toggleVideo}>
            <img src="https://singleton-website.ru/default/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>

          <Trailer onClick={clickTrailer}>
            <img src="https://singleton-website.ru/default/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="https://singleton-website.ru/default/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>

      {showVideo && (
        <VideoWrapper
          ref={videoWrapperRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}>
          {detailData.films &&
            detailData.films.map((video, index) => (
              <Video key={index} controls onEnded={() => setShowVideo(false)}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </Video>
            ))}
        </VideoWrapper>
      )}
    </Container>
  );
};

export default Detail;
