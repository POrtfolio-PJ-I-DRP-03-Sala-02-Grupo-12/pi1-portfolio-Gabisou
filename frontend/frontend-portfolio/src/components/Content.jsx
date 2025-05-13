import ProjectCard from "../components/ProjectCard";
import AddProjectForm from "../components/AddProjectForm";

const Content = () => {
  const contentStyle = {
    backgroundColor: "#C6BEEE",
    textAlign: "center",
    paddingTop: "50px",
  };

  return (
    <>
      <div style={contentStyle}>
        <AddProjectForm />
        <ProjectCard />
      </div>
    </>
  );
};

export default Content;
