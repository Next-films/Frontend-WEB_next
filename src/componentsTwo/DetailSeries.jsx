import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import disneyFilms from '../disneyPlusMoviesData';
import All from '../All.json'; // Используем .json файл

const SeriesDetail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);
  const [filmsArray, setFilmsArray] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (id) {
      const combinedData = [...disneyFilms, ...All];
      const foundSeries = combinedData.find(series => series.id === id);
      if (foundSeries) {
        setDetailData(foundSeries);
        setFilmsArray(
          foundSeries.films.map(film => ({
            videoUrl: film.videoUrl,
            previewUrl: film.previewUrl,
          })) || []
        );
      } else {
        console.error('Сериал не найден');
      }
    }
  }, [id]);

  const handlePlay = useCallback(() => {
    setVideoPlayed(true);
  }, []);

  const handleEpisodeChange = useCallback((index) => {
    setCurrentEpisodeIndex(index);
    setShowVideo(true); // Показываем видео плеер
  }, []);

  const handleTrailerClick = useCallback(() => {
    window.open(detailData.trailer, '_blank');
  }, [detailData.trailer]);

  const buttonText = videoPlayed ? "Выбрать эпизод" : "Play";

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>
      <Content>
        <ImageTitle>
          <img alt={detailData.title} src={detailData.titleImg} />
        </ImageTitle>
        <Controls>
          <Player onClick={handlePlay}>
            <img src="http://5.144.98.17:8080/d1/default/images/play-icon-black.png" alt="" />
            <span>{buttonText}</span>
          </Player>
          <Trailer onClick={handleTrailerClick}>
            <img src="http://5.144.98.17:8080/d1/default/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="http://5.144.98.17:8080/d1/default/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        {videoPlayed && filmsArray.length > 0 && (
          <CarouselWrapper>
            <ScrollButton className="left" onClick={() => scroll('left')}>
              &lt;
            </ScrollButton>
            <Carousel ref={carouselRef}>
              {filmsArray.map((film, index) => (
                <EpisodeWrap key={index} onClick={() => handleEpisodeChange(index)}>
                  {showVideo && currentEpisodeIndex === index ? (
                    <VideoPlayer
                      src={film.videoUrl}
                      controls
                      autoPlay
                      onClick={() => setShowVideo(false)} // Скрываем видео при клике
                    />
                  ) : (
                    <VideoPreview
                      src={film.previewUrl}
                      alt={`Episode ${index + 1}`}
                    />
                  )}
                </EpisodeWrap>
              ))}
            </Carousel>
            <ScrollButton className="right" onClick={() => scroll('right')}>
              &gt;
            </ScrollButton>
          </CarouselWrapper>
        )}
        <DescriptionContainer>
          <Description>{detailData.description}</Description>
        </DescriptionContainer>
      </Content>
    </Container>
  );
};

// Styled components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
    max-width: 70%;
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
      width: 50%;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  text-align: center;
  z-index: 1;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
  position: relative;
`;

const Player = styled.button`
  font-size: 15px;
  margin-right: 22px;
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
  font-size: 20px;
  min-height: 20px;
  margin-bottom: 16px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: left;
  z-index: 1;
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

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 0;
  width: 100%;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  scroll-behavior: smooth;
  flex: 1;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EpisodeWrap = styled.div`
  position: relative;
  width: 300px; /* Увеличиваем ширину плашек */
  height: 170px; /* Увеличиваем высоту плашек */
  flex: 0 0 auto;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 250ms ease;
  border: 3px solid rgba(249, 249, 249, 0.1);

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const VideoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default SeriesDetail;
