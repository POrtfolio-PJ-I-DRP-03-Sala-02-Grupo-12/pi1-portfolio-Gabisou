import React, { useState } from "react";
import "./ProjectCard.css";

const ProjectCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [ModalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div
        className="card-style"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="card-img-style"
          src="https://img.itch.zone/aW1nLzU1MDU5MDMucG5n/315x250%23c/nAHQD7.png"
          alt="Project Image"
        />

        <div className="card-content-style">
          <h2 className="card-title-style">Título do Projeto</h2>
          <p className="card-subtitle-style">
            Subtítulo ou descrição breve do projeto que dá uma visão geral.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
