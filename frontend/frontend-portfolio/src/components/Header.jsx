import gabisouLogo from "../assets/img/gabisoulogo.png";

const Header = () => {
  const containerStyle = {
    backgroundColor: "#383f4d",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const titleStyle = {
    color: "#FFFFFF",
  };

  return (
    <>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Header</h1>
        {/* <img src="gabisouLogo" alt="Logo Empresa" />         Verificar o que deu errado*/}
      </div>
    </>
  );
};

export default Header;
