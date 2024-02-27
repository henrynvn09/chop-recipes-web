import React, { useState } from "react";
import  '../Styles/Upload.css'
import Step from "../Components/RecipeStep";
import StepsList from "../Components/StepsList";

export default function UploadPage() {
  const [newStep, setNewStep] = useState({});
  // In an input field’s change event, event.target would be the input field that the user is typing into. 
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewStep((prev) => ({ ...prev, id: Date.now(), [name]: value }));
  };
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const [allSteps, setAllSteps] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newStep.title) return;
    setAllSteps((prev) => [...prev, { ...newStep, image }]);
    setNewStep({});
    setImage(null);
  };
  const handleDelete = (stepIdToRemove) => {
    setAllSteps((prev) => prev.filter(
      (step) => step.id !== stepIdToRemove
    ));
  };

  return (
    <main>
      <h1>Steps</h1>
      <Step
        newStep={newStep}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
      />
      <StepsList allSteps={allSteps} handleDelete={handleDelete} />
    </main>
  );
}
