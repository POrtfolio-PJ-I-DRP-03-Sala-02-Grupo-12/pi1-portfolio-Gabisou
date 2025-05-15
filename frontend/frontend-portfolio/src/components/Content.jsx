import AddProjectForm from "../components/AddProjectForm";
import ListAllProjectsCards from "../components/ListAllProjectsCards";
import ProjectCard from "../components/ProjectCard";

const Content = () => {
  return (
    <>
      <div className="bg-indigo-500">
        <AddProjectForm />
        {/* <ListAllProjectsCards /> */}
        <ProjectCard />
      </div>
    </>
  );
};

export default Content;
