import React from 'react';
import '../styles/Notification.css';
import CancelIcon from '@mui/icons-material/Cancel';
import Proptypes from 'prop-types';

const Notification = ({ isAlert }) => {
  if (!isAlert) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: '#0e2f36',
        borderColor: '#25d1da',
        border: '1px solid #25d1da',
        borderStyle: 'solid',
        color: '#fff',
        margin: '0 0 16px',
        padding: '8px',
        bottom: '85px',
        position: 'fixed',
        WebkitBackdropFilter: 'blur(30px)',
        backdropFilter: 'blur(30px)',
        insetInlineStart: '50%',
        transform: 'translateX(-50%)',
        zIndex: '1000',
        maxWidth: 'inherit',
        width: 'calc(100% - 24px)',
        display: 'inline-flex',
        alignItems: 'center',

        marginBottom: '16px',
        minHeight: '48px',
        borderRadius: '8px',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: '1',
        }}
      >
        This is a notification.
      </span>
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
        }}
        className='cancel-notification'
      >
        <CancelIcon />
      </button>
    </div>
  );
};

Notification.propTypes = {
  isAlert: Proptypes.bool,
};

export default Notification;
