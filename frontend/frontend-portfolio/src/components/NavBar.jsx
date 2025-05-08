import Box from "@mui/material/Box";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <Box component="navBar">
        <ul>
          <li>Home</li>
          <li>Works</li>
          <li>Contact</li>
        </ul>
      </Box>
    </>
  );
};

export default NavBar;
