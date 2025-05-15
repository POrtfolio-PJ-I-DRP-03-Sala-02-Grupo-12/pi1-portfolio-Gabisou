import React, { useState } from "react";

const ProjectCard = () => {
  return (
    <>
      <div className="flex justify-center p-4 bg-indigo-900 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-neutral-900 rounded-lg shadow">
              <img
                src={`https://picsum.photos/seed/card${i}/600/300`}
                alt={`Imagem do Card ${i + 1}`}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-xl font-bold mb-1">Card {i + 1}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
