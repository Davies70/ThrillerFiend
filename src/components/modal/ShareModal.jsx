import React from 'react';
import OutsideClickHandler from '../OutsideClickHandler';

const ShareModal = () => {
  return (
    <OutsideClickHandler>
      <div className='modal'>
        <h2>Share</h2>
        <p>Share this book with your friends</p>
        <div className='modal__buttons'>
          <button className='modal__button'>Facebook</button>
          <button className='modal__button'>Twitter</button>
          <button className='modal__button'>Whatsapp</button>
          <button className='modal__button'>Email</button>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default ShareModal;
