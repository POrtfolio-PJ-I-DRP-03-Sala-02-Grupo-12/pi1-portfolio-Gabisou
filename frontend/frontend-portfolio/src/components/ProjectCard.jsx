import React, { useState } from "react";

const ProjectCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    width: "100%",
    maxWidth: "350px",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    transition: "transform 0.2s ease",
    transform: isHovered ? "translateY(-4px)" : "none",
    cursor: "pointer",
  };

  const cardImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const cardContentStyle = {
    padding: "16px",
  };

  const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    margin: "0",
    color: "#333",
  };

  const cardSubtitleStyle = {
    fontSize: "0.95rem",
    marginTop: "8px",
    color: "#666",
  };

  return (
    <>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          style={cardImgStyle}
          src="https://img.itch.zone/aW1nLzU1MDU5MDMucG5n/315x250%23c/nAHQD7.png"
          alt="Project Image"
        />

        <div style={cardContentStyle}>
          <h2 style={cardTitleStyle}>Título do Projeto</h2>
          <p style={cardSubtitleStyle}>
            Subtítulo ou descrição breve do projeto que dá uma visão geral.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
