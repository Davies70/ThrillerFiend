import { useEffect, useState } from 'react';

const useCheckIfOverflowing = (descriptionRef, isTextExpanded, description) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkIfOverflowing = () => {
      const descriptionElement = descriptionRef.current;
      if (descriptionElement) {
        const maxLines = 5;
        const lineHeight = parseInt(
          window.getComputedStyle(descriptionElement).lineHeight,
          10
        );

        const maxHeight = lineHeight * maxLines;

        if (descriptionElement.scrollHeight > maxHeight) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    checkIfOverflowing();
    window.addEventListener('resize', checkIfOverflowing);

    return () => {
      window.removeEventListener('resize', checkIfOverflowing);
    };
  }, [descriptionRef, isTextExpanded, description]);

  return showButton;
};

export default useCheckIfOverflowing;
