import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css'
import { mdiPencil, mdiContentSave } from '@mdi/js'
import ButtonIcon from './ButtonIcon'
import '../Styles/Scrollbar.css'
import { useUser } from '../contexts/UserContent'
import axios from 'axios'
function EditableInput({value: initialValue, type = '', onSave, ...props}) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [charCount, setCharCount] = useState(initialValue ? initialValue.length : 0);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const inputRef = useRef(null)
    const {userID} = useUser();
    const userIDedit = userID;
    console.log("userIDedit: " + userIDedit)
    axios.defaults.withCredentials = true;
    const handleSave = (event) => {
      event.stopPropagation();
      console.log("clicked save")
      onSave(value);
      console.log("value: " + value)
      console.log("userID: " + userIDedit)
      axios.post('http://localhost:5000/api/updateDescription' , {description: value, userID: userIDedit})
        .then(result => {
            console.log(result.data);
        })
        .catch(err => console.log(err))
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 3000); // Hide message after 3 seconds
    }

    function turnOnEditMode() {
      console.log("textarea clicked");
        setIsEditMode(true);
        inputRef.current.focus();
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        setCharCount(event.target.value.length);
    }

    const getCharCountColor = () => {
        const percentage = charCount / 2000;
        const hue = (1 - percentage) * 120;
        return `hsl(${hue}, 100%, 40%)`;
    }

    const handleBlur = (event) => {
      // Check if the save button is being clicked
      if (event.relatedTarget && event.relatedTarget.className.includes('save-button')) {
        // If it is, delay setting isEditMode to false
        setTimeout(() => setIsEditMode(false), 100);
      } else {
        // If it's not, set isEditMode to false immediately
        setIsEditMode(false);
      }
    }


    return (
        <div className='flex justify-center items-center'>
          <span className="relative"> 
          <textarea
            ref={inputRef}
            value={value} 
            readOnly={!isEditMode} 
            onClick={turnOnEditMode}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-96 max-w-96 h-auto min-h-32 max-h-72 py-2 px-4 font-roboto text-sm border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-100 transition-colors resize-none overflow-auto custom-scrollbar"
            maxLength={2000}
            {...props}
          />
            {isEditMode && (
              <>
                <div style={{color: getCharCountColor(), transition: 'color 0.5s'}} className="absolute bottom-[-5px] right-0 text-sm">
                  {charCount}/2000
                </div>
                <ButtonIcon 
                  onMouseDown={(event) => {
                    event.preventDefault(); // Prevent the textarea from losing focus
                    handleSave(event);
                  }}
                  className='hover:bg-gray-200 rounded-full absolute bottom-6 left-2.5 save-button'
                  path={mdiContentSave}
                  size={0.65}
                  color='grey'
                />
              </>
            )}
            {!isEditMode && (
              <ButtonIcon 
                onClick={turnOnEditMode}
                className='hover:bg-gray-200 rounded-full absolute bottom-6 right-2.5'
                path={mdiPencil}
                size={0.65}
                color='grey'
              />
            )}
          </span>
          {showSaveMessage && (
              <div className="text-green-500 absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 text-xs">Description saved!</div>
            )}
        </div>
      );
}

EditableInput.propTypes = {
    value: PropTypes.string,
    onSave: PropTypes.func
}

export default EditableInput