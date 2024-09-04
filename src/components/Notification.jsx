import React from 'react';
import '../styles/Notification.css';
import CancelIcon from '@mui/icons-material/Cancel';
import Proptypes from 'prop-types';

const Notification = ({ notification, closeNotification }) => {
  if (notification.title === '') {
    return null;
  }
  return (
    <div className='notification-container'>
      <div className='notification-body'>
        <span className='notification-title'>{notification.message}</span>
        <button onClick={closeNotification} className='cancel-notification'>
          <CancelIcon />
        </button>
      </div>

      <div className='not-loader'></div>
    </div>
  );
};

Notification.propTypes = {
  notification: Proptypes.object,
  closeNotification: Proptypes.func,
};

export default Notification;
