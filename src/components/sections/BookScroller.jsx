import { useRef, useState, useEffect, useMemo } from "react";
import Header from "../Header";
import ContentScroller from "../ContentScroller";
import PropTypes from "prop-types";
import { Fade, Box } from "@mui/material";

const BookScroller = ({
  shape = "square",
  data = [],
  navLink,
  headerText,
  isNavLink = false,
  isAuthorName = false,
  isControls = true,
  isDataAvailable = true,
}) => {
  const contentScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Safely filter out nulls whether it's a Book (book_id) or an Author (id)
  const sanitizedData = useMemo(() => {
    return (data || []).filter((item) => item && (item.book_id || item.id));
  }, [data]);

  // Intersection Observer to trigger fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Don't render an empty section if the filtered array is completely empty
  if (sanitizedData.length === 0 && isDataAvailable) return null;

  return (
    <Box ref={sectionRef} sx={{ mb: 4 }}>
      <Fade in={isVisible} timeout={800}>
        <section className="section">
          <Header
            contentScrollRef={contentScrollRef}
            headerText={headerText}
            navLink={navLink}
            isNavLink={isNavLink}
            isControls={isControls && sanitizedData.length > 4}
          />
          <ContentScroller
            contentScrollRef={contentScrollRef}
            shape={shape}
            data={sanitizedData}
            isAuthorName={isAuthorName}
            isDataAvailable={isDataAvailable}
          />
        </section>
      </Fade>
    </Box>
  );
};

BookScroller.propTypes = {
  shape: PropTypes.string,
  data: PropTypes.array,
  navLink: PropTypes.string,
  headerText: PropTypes.string.isRequired,
  isNavLink: PropTypes.bool,
  isAuthorName: PropTypes.bool,
  isControls: PropTypes.bool,
  isDataAvailable: PropTypes.bool,
};

export default BookScroller;
