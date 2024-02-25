import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import disneyFilms from '../disneyPlusMoviesData';
import All from '../All';

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [savedPosition, setSavedPosition] = useState(null);
  const [message, setMessage] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (id) {
      const combinedData = [...disneyFilms, ...All];
      const foundFilm = combinedData.find(film => film.id === id);
      setDetailData(foundFilm);

      const savedPosition = localStorage.getItem(`video_position_${id}`);
      if (savedPosition) {
        setSavedPosition(JSON.parse(savedPosition));
        setMessage(`Вы прервали просмотр "${foundFilm.title}" на ${formatTime(JSON.parse(savedPosition))}`);
      }
    }

    return () => {
      setDetailData({});
      if (detailData.id && savedPosition !== null) {
        localStorage.setItem(`video_position_${detailData.id}`, JSON.stringify(savedPosition));
      }
    };
  }, [id]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setSavedPosition(null);
    setShowModal(false);
    if (detailData.title && savedPosition !== null) {
      setMessage(`Вы прервали просмотр "${detailData.title}" на ${formatTime(savedPosition)}`);
    }
  };

  const continueWatching = () => {
    setShowModal(true);
    videoRef.current.currentTime = savedPosition;
    videoRef.current.play();
  };

  const films = detailData.films;
  const trailer = detailData.trailer;

  const ClickTrailer = () => {
    setSavedPosition(null);
    window.open(trailer, '_blank');
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Container>
      {message && (
        <Message>
          {message}
          <ContinueButton onClick={continueWatching}>Продолжить просмотр</ContinueButton>
        </Message>
      )}
      {showModal && (
        <Modal>
          <CloseModalButton onClick={closeModal}>X</CloseModalButton>
          <VideoWrapper>
            <video ref={videoRef} controls onTimeUpdate={(e) => setSavedPosition(e.target.currentTime)}>
              <source src={films} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </VideoWrapper>
        </Modal>
      )}
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>

      <ContentMeta>
        <ImageTitle>
          <img alt={detailData.title} src={detailData.titleImg} />
        </ImageTitle>
        <Controls>
          <Player onClick={openModal}>
            <img src="http://94.241.168.136/default/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>

          <Trailer onClick={ClickTrailer}>
            <img src="http://94.241.168.136/default/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="http://94.241.168.136/default/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>

        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  position: relative; /* Делаем контейнер относительным */
  align-items: flex-end;
  display: flex;
  justify-content: flex-start; // Align to the left
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    position: absolute; /* Делаем изображение абсолютным */
    bottom: 20px; /* Сдвигаем на 20px вниз относительно нижней границы контейнера */
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }

  @media (max-width: 768px) {
    align-items: center; // Center vertically on smaller screens
    justify-content: center; // Center horizontally on smaller screens
    img {
      position: static; /* Возвращаем изображение в статическое положение на мобильных устройствах */
      bottom: auto;
      margin-top: 30%; /* Добавляем отступ сверху на мобильных устройствах */
    }
  }
`;





const ContentMeta = styled.div`
  max-width: 874px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
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

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px -12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
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
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
`;

const VideoWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  text-align: center;
`;

const Message = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  text-align: center;
`;

const ContinueButton = styled.button`
  background-color: #f9f9f9;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  margin-top: 10px;

  &:hover {
    background-color: #e2e2e2;
  }
`;

export default Detail;
