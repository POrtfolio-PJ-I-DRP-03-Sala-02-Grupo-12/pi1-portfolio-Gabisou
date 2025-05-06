import Box from "@mui/material/Box";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Box component="home" sx={styles.home}>
        <Header />
      </Box>
    </>
  );
};

export default Home;
