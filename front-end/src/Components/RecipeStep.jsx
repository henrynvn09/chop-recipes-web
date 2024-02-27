import React from "react";

export default function Step({ newStep, handleChange, handleSubmit, handleImageChange }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="New Step"
        value={newStep.title || ""}
        onChange={handleChange}
      />
      {!newStep.title ? null : (
        <>
          <label for="imageInput">Input an image</label>
          <input type="file" id = "imageInput" accept="image/*" onChange={handleImageChange}/>
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