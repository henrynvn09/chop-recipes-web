import React from "react";

export default function Step({ newStep, handleChange, handleSubmit, handleImageChange, imageUploaded }) {
  return (
    <form onSubmit={handleSubmit} className="step-form">
      <input
        name="title"
        placeholder="New Step"
        value={newStep.title || ""}
        onChange={handleChange}
      />
      {!newStep.title ? null : (
        <>
          <div className="upload-box">
            <label htmlFor="imageInput" className="image-label">
              <div className="upload-icon-container">
                <div className={`upload-icon ${imageUploaded ? 'uploaded' : ''}`}></div>
              </div>
              <p className="upload-text">Browse Files</p>
            </label>
            <input type="file" id = "imageInput" accept="image/*" className="file-input" onChange={handleImageChange}/>
          </div>
          <textarea
            name="description"
            placeholder="Details..."
            value={newStep.description || ""}
            onChange={handleChange}
          />
          <button type="submit">Add Step</button>
        </>
      )}
    </form>
  );
}