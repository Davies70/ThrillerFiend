import PropTypes from "prop-types";
import OutboundIcon from "@mui/icons-material/Outbound";
import { Link } from "react-router-dom";
import { Box, Typography, Grow } from "@mui/material";

const GridItem = ({ book }) => {
  const { title, book_image, authors, book_id } = book;

  return (
    <Grow in={true} timeout={600}>
      <Box
        sx={{
          display: "inline-block",
          width: {
            xs: "100%",
            sm: "calc(50% - 12px)",
            md: "calc(33.333% - 12px)",
          },
          padding: "8px 0",
          paddingRight: "12px",
        }}
      >
        <Box
          sx={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: "16px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-subtle)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            position: "relative",
            "&:hover": {
              transform: "translateY(-4px)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "var(--accent-blue)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.6)",
              "& .cover-image": { transform: "scale(1.1)" },
              "& .visit-overlay": { opacity: 1 },
            },
          }}
        >
          {/* IMAGE SECTION */}
          <Box
            component={Link}
            to={`/book/${book_id}`}
            sx={{
              position: "relative",
              flexBasis: "72px",
              width: "72px",
              height: "72px",
              flexShrink: 0,
              overflow: "hidden",
              display: "block",
            }}
          >
            <Box
              component="img"
              className="cover-image"
              src={book_image || "https://lgimages.s3.amazonaws.com/nc-md.gif"}
              loading="lazy"
              alt={title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
            {/* Subtle Outbound Overlay on Hover */}
            <Box
              className="visit-overlay"
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s ease",
                color: "var(--accent-blue)",
              }}
            >
              <OutboundIcon fontSize="small" />
            </Box>
          </Box>

          {/* TEXT CONTENT SECTION */}
          <Box
            component={Link}
            to={`/book/${book_id}`}
            sx={{
              flex: "1",
              overflow: "hidden",
              px: 2,
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                transition: "color 0.2s ease",
              }}
            >
              {title}
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                mt: 0.5,
                fontWeight: 500,
              }}
            >
              {authors?.join(", ")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};

GridItem.propTypes = {
  book: PropTypes.object.isRequired,
};

export default GridItem;
