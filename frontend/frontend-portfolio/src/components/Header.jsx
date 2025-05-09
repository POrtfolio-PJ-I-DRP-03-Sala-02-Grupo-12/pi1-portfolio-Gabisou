import { Link } from "react-router-dom";
import gabisouLogo from "../assets/img/gabisoulogo.png";

const Header = () => {
  const containerStyle = {
    backgroundColor: "#383f4d",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const logoStyle = {
    width: "150px",
    height: "auto",
  };

  return (
    <>
      <div style={containerStyle}>
        <Link to="/" aria-label="Home">
          <img src={gabisouLogo} style={logoStyle} alt="Logo Gabisou" />
        </Link>
      </div>
    </>
  );
};

export default Header;
