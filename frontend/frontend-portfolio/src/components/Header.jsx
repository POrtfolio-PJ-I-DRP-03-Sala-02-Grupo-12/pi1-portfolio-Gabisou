import Box from "@mui/material/Box";
import "./Header.css";
import gabisouLogo from "../assets/img/gabisoulogo.png";
import NavBar from "../components/NavBar";

const Header = () => {
  return (
    <>
      <Box component="header">
        Header
        {/* <img src="gabisouLogo" alt="Logo Empresa" />         Verificar o que deu errado*/}
        <NavBar />
      </Box>
    </>
  );
};

export default Header;
