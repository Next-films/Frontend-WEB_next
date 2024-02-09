import React, { useState } from 'react';


function Modal() {
  return (
    <div className="modal modal1">
      <div className="modal__main">
        <h2 className="modal__title">Модальное окно</h2>
        <div className="modal__container">
          <p>Сделаем правильно</p>
          <p>HTML CSS JavaScript</p>
        </div>
        <button className="modal__btn">Смотреть видео</button>
        <button className="modal__close">&#10006;</button>
      </div>
    </div>
  );
}

function popup() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <section className="section">
        <h1 className="section__title">Модальное окно</h1>
        <button className="section__button section__button1" onClick={() => setModalOpen(true)}>Открыть</button>
      </section>
      {modalOpen && <Modal />}
    </div>
  );
}

export default popup;
