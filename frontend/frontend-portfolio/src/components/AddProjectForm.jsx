import "./AddProjectForm.css";
import React, { useState } from "react";
// review variable names and API adress
const AddProjectForm = () => {
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
      <div>
        <h1 className="text-2xl font-bold pt-5 flex justify-center text-white">
          Projects
        </h1>
        <div className="m-10 flex justify-center">
          <h2 className="m-4 min-w-80 flex text-white">
            Our portfolio includes diverse projects, ranging from mobile games
            and educational tools to virtual reality applications. Recent
            projects include a hybrid visual novel, biomedical training software
            using VR, and several engaging mobile games that prioritize user
            experience and cross-platform compatibility.
          </h2>
          <button
            className="max-h-16 min-w-30 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setModalIsOpen(true)}
          >
            Add Projects
          </button>
        </div>

        {ModalIsOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setModalIsOpen(false)}
          >
            <div
              className="bg-white w-full max-w-lg rounded-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Game info  */}
                <div>
                  <label
                    for="project_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project name:
                  </label>
                  <input
                    type="text"
                    id="project_name"
                    name="project_name"
                    value={formData.project_name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-b-gray-950 rounded-lg px-4 py-2"
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
                <div className="justify-self-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Project
                  </button>
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
      </div>
    </>
  );
};

export default AddProjectForm;
