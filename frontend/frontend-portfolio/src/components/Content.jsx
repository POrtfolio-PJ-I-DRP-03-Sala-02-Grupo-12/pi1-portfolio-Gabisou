import AddProjectForm from "../components/AddProjectForm";
import ListAllProjectsCards from "../components/ListAllProjectsCards";
import ProjectCard from "../components/ProjectCard";

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
        {/* <ListAllProjectsCards /> */}
        <ProjectCard />
      </div>
    </>
  );
};

export default Content;
