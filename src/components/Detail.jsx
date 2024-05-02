import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import disneyFilms from '../disneyPlusMoviesData';
import All from '../All';

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (id) {
      const combinedData = [...disneyFilms, ...All];
      const foundFilm = combinedData.find(film => film.id === id);
      setDetailData(foundFilm);
    }
  }, [id]);

  useEffect(() => {
    const storedTime = localStorage.getItem('videoCurrentTime');
    const storedModalState = localStorage.getItem('showModal');
    
    if (storedTime && storedModalState) {
      setCurrentTime(parseFloat(storedTime));
      setShowModal(storedModalState === 'true');
    } else {
      setShowModal(false);
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      videoRef.current.currentTime = currentTime;
      videoRef.current.play();
    } else {
      localStorage.removeItem('videoCurrentTime');
    }
  }, [showModal]);

  const handlePlay = () => {
    setVideoPlayed(true);
    setShowModal(true);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('play', handlePlay);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handlePlay);
      }
    };
  }, []);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    if (videoPlayed) {
      setCurrentTime(videoRef.current.currentTime);
      localStorage.setItem('videoCurrentTime', videoRef.current.currentTime.toString());
    }
    setShowModal(false);
    localStorage.setItem('showModal', 'false');
  };

  const ClickTrailer = () => {
    window.open(detailData.trailer, '_blank');
  };

  const buttonText = videoPlayed ? "Продолжить просмотр" : "Пауза";

  return (
    <Container>
      {showModal && (
        <Modal>
          <CloseModalButton onClick={closeModal}>X</CloseModalButton>
          <VideoWrapper>
            <VideoFrame>
              <video
                ref={videoRef}
                controls
                onPause={() => {}}
              >
                <source src={detailData.films} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </VideoFrame>
          </VideoWrapper>
        </Modal>
      )}
      <Content>
        <ImageTitle>
          <img alt={detailData.title} src={detailData.titleImg} />
        </ImageTitle>
        <Controls>
          { !showModal && (
            <Player onClick={openModal}>
              <img src="http://94.241.168.136/default/images/play-icon-black.png" alt="" />
              <span>Play</span>
            </Player>
          )}
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
        <DescriptionContainer>
          <SubTitle>{detailData.subTitle}</SubTitle>
          <Description>{detailData.description}</Description>
        </DescriptionContainer>
      </Content>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>
    </Container>
  );
};

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

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: left;
  z-index: 1;
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
  border-radius: 20px;
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
  width: 100%;
  height: 70vh;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
`;

const VideoFrame = styled.div`
  border: 1px solid #fff;
  border-radius: 20px;
`;

const ContinueButton = styled(Player)`
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ContinueButtonOverlay = styled(ContinueButton)`
  background-color: transparent;
  border-color: transparent;
  color: transparent;
  pointer-events: none;
`;

export default Detail;
