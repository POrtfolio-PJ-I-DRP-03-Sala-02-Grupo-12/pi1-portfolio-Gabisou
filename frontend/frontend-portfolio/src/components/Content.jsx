import ProjectCard from "../components/ProjectCard";
import "./Content.css";
import React, { useState } from "react";

const Content = () => {
  const contentStyle = {
    backgroundColor: "#C6BEEE",
    textAlign: "center",
    paddingTop: "50px",
  };

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "",
    project_description: "",
    link_name: "",
    link_url: "",
    image_name: "",
    image_description: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/jogos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Project added successfully!");
      setFormData({
        project_name: "",
        project_description: "",
        link_name: "",
        link_url: "",
        image_name: "",
        image_description: "",
        image_url: "",
      });
    } else {
      alert("Error to add project.");
    }
  };

  return (
    <>
      <div style={contentStyle}>
        <h1>Projects</h1>
        <button onClick={() => setModalIsOpen(true)}>Add Projects</button>

        {ModalIsOpen && (
          <div
            className="modal-styles-overlay"
            onClick={() => setModalIsOpen(false)}
          >
            <div
              className="modal-styles-content"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                {/* Game info  */}
                <div>
                  <label for="project_name">Project name:</label>
                  <input
                    type="text"
                    id="project_name"
                    name="project_name"
                    value={formData.project_name}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label for="project_description">Project description:</label>
                  <input
                    type="text"
                    id="project_description"
                    name="project_description"
                    value={formData.project_description}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label for="link_name">Project link name:</label>
                  <input
                    type="text"
                    id="link_name"
                    name="link_name"
                    value={formData.link_name}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label for="link_url">Project link url:</label>
                  <input
                    type="url"
                    id="link_url"
                    name="link_url"
                    value={formData.link_url}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                {/* Images Game info  */}
                <div>
                  <label for="image_name">Image name:</label>
                  <input
                    type="text"
                    id="image_name"
                    name="image_name"
                    value={formData.image_name}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label for="image_description">Image description:</label>
                  <input
                    type="text"
                    id="image_description"
                    name="image_description"
                    value={formData.image_description}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label for="image_url">Image link url:</label>
                  <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <button type="submit">Add Project</button>
                </div>
              </form>

              <span
                className="modal-styles-closeBtn"
                onClick={() => setModalIsOpen(false)}
              >
                &times;
              </span>
            </div>
          </div>
        )}
        <ProjectCard />
      </div>
    </>
  );
};

export default Content;
