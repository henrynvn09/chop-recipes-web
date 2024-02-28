import React from "react";

export default function StepsList({ allSteps, handleDelete }) {
  return (
    <div className="recipe-container">
      <ul id = "steps">
        {allSteps.map(({ title, description, id, image }) => (
          <li key={id}>
            <div>
              <h2>{title}</h2>
              <button onClick={() => handleDelete(id)}>X</button>
            </div>
            {!description ? null : <p>{description}</p>}
            {image && (
              <div className="stepImageContainer">
                <img src={URL.createObjectURL(image)} alt={title} className="stepImage" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}



