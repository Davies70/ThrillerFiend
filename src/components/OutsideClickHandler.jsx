import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OutsideClickHandler = ({ onOutsideClick, children, className }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
};

OutsideClickHandler.propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default OutsideClickHandler;
