import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'tailwindcss/tailwind.css';
import EditableInput from './EditableInput'; // Adjust the path as necessary
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContent";

function UserDescriptionBox({ value = '', ...props }) {
  const textareaRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const { userID } = useUser();
  const { profile_id } = useParams();

  console.log("userID: in zendaya " + userID);
  console.log("profile_id: in zendaya" + profile_id);
  
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (!isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      adjustHeight();
    }
  }, [isEditing, value]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      adjustHeight();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {isEditing && profile_id === userID ? (
        <EditableInput
          value={value}
          onSave={(newDescription) => {
                console.log('New description:', newDescription);
                //TODO: Implement the logic to call the backend to update the user's description
            }}
        />
      ) : (
        <textarea
            ref={textareaRef}
            value={value}
            readOnly
            className="w-1/2 min-w-96 h-auto py-2 px-4 text-sm font-semibold text-black italic font-gillsans rounded-md shadow-sm text-center resize-none overflow-hidden focus:outline-none focus:ring-0 border-2 rounded-lg"
            maxLength={2000}
            style={{borderImage: 'linear-gradient(to right, #ff7eb6, #da49be, #7e6bff, #2ac5d6)', borderImageSlice: 1}}
            {...props}
          />
      )}
      {profile_id === userID && (
        <div className='flex items-center justify-center'>
          <button
            onClick={toggleEdit}
            className=" bg-blue-500 rounded-3xl text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out px-4 py-2"
          >
            {isEditing ? 'Cancel' : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>}
          </button>
        </div>
      )}
    </div>
  );
}

UserDescriptionBox.propTypes = {
  value: PropTypes.string,
};

export default UserDescriptionBox;
