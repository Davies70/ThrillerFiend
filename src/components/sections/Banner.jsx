import "../../styles/sections/Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="banner-container" onClick={() => navigate("/signup")}>
      <div className="banner-content">
        <h1 className="banner-title">
          Welcome, <span>Thrillseekers</span>
        </h1>
        <p className="banner-subtitle">
          Sign up to explore the dark depths of thrillers and mysteries. Let
          Thriller Fiend be your guide.
        </p>
      </div>
    </div>
  );
};

export default Banner;
