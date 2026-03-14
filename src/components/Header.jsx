import { useEffect, useState, useCallback } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "../styles/Header.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({
  headerText,
  contentScrollRef,
  navLink,
  isNavLink,
  isControls,
}) => {
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScrollPosition = useCallback(() => {
    if (contentScrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = contentScrollRef.current;
      // Use a 5px buffer to account for sub-pixel rendering issues
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
      setCanScrollLeft(scrollLeft > 5);
    }
  }, [contentScrollRef]);

  useEffect(() => {
    const currentRef = contentScrollRef.current;
    if (currentRef) {
      checkScrollPosition(); // Check on mount
      currentRef.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }
    return () => {
      if (currentRef)
        currentRef.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [contentScrollRef, checkScrollPosition]);

  const handleScroll = (direction) => {
    if (contentScrollRef.current) {
      const { clientWidth } = contentScrollRef.current;
      // Scroll by 80% of the visible width so users don't lose context
      const scrollAmount =
        direction === "right" ? clientWidth * 0.8 : -(clientWidth * 0.8);

      contentScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="header">
      <div className="header-text">
        <h2>{headerText}</h2>
      </div>

      {isControls && (
        <div className="controls">
          <button
            className={`arrow ${!canScrollLeft ? "disabled" : ""}`}
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <KeyboardArrowLeftIcon />
          </button>

          <button
            className={`arrow ${!canScrollRight ? "disabled" : ""}`}
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <KeyboardArrowRightIcon />
          </button>

          {isNavLink && navLink && (
            <button className="see-all">
              <Link to={navLink}>See All</Link>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  headerText: PropTypes.string,
  contentScrollRef: PropTypes.object,
  navLink: PropTypes.string,
  isControls: PropTypes.bool,
  isNavLink: PropTypes.bool,
};

export default Header;
