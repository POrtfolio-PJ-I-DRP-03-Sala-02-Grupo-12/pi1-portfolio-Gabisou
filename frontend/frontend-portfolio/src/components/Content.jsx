import ProjectCard from "../components/ProjectCard";

const Content = () => {
  const contentStyle = {
    backgroundColor: "#C6BEEE",
  };

  return (
    <>
      <div style={contentStyle}>
        <h1>Projects</h1>
        <button>Add Projects</button>
        <ProjectCard />
      </div>
    </>
  );
};

export default Content;
