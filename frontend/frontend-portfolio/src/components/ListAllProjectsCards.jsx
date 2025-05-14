import React, { useEffect, useState } from "react";
import "./ListAllProjectsCards.css";
// review variable names and API adress
const ListAllProjectsCards = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error to load projects:", err));
  }, []);

  return (
    <>
      <div className="grid-container">
        {projects.map((projects) => (
          <div key={projects.id} className="card">
            <img src={projects.imageUrl} alt={projects.title} />
            <div className="card-content">
              <h2 className="card-title">{projects.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListAllProjectsCards;
