import "../styles/ContentScroller.css";
import Shape from "./Shape";
import PropTypes from "prop-types";

const ContentScroller = ({
  contentScrollRef,
  shape,
  data,
  isDataAvailable,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="wrapper">
        <div className="empty-message">No content available at the moment.</div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="content-scroll" ref={contentScrollRef}>
        {data.map((item, i) => (
          <Shape
            // Support both data structures for keys
            key={item.book_id || item.id || i}
            shape={shape}
            // Pass the raw item; the Shape component does the translation!
            book={item}
          />
        ))}
      </div>
    </div>
  );
};

ContentScroller.propTypes = {
  contentScrollRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  shape: PropTypes.string.isRequired,
  data: PropTypes.array,
  isDataAvailable: PropTypes.bool,
};

export default ContentScroller;
