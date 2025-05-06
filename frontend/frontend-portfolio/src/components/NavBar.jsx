import Box from "@mui/material/Box";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <Box component="nav" sx={styles.nav}>
        <ul style={styles.ulNav}>
          <li>Home</li>
          <li>Works</li>
          <li>Contact</li>
        </ul>
      </Box>
    </>
  );
};

const styles = {
  nav: {},
};

export default NavBar;
