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
              <form>
                {/* Game info  */}
                <div>
                  <label for="project_name">Project name:</label>
                  <input
                    type="text"
                    id="project_name"
                    name="project_name"
                    required
                  ></input>
                </div>
                <div>
                  <label for="project_description">Project description:</label>
                  <input
                    type="text"
                    id="project_description"
                    name="project_description"
                    required
                  ></input>
                </div>
                <div>
                  <label for="link_name">Project link name:</label>
                  <input
                    type="text"
                    id="link_name"
                    name="link_name"
                    required
                  ></input>
                </div>
                <div>
                  <label for="link_url">Project link url:</label>
                  <input
                    type="url"
                    id="link_url"
                    name="link_url"
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
                    required
                  ></input>
                </div>
                <div>
                  <label for="image_description">Image description:</label>
                  <input
                    type="text"
                    id="image_description"
                    name="image_description"
                    required
                  ></input>
                </div>
                <div>
                  <label for="image_url">Image link url:</label>
                  <input
                    type="text"
                    id="link_url"
                    name="link_url"
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
