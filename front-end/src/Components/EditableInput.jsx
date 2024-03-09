import React from 'react'
//import css from '../Styles/EditableInput.module.scss'
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css'
import { mdiPencil } from '@mdi/js'
import ButtonIcon from './ButtonIcon'
import '../Styles/Scrollbar.css'

function EditableInput({value, type = '', ...props}) {
    const [isEditMode, setIsEditMode] = React.useState(false)
    const inputRef = React.useRef(null)
    function turnOnEditMode() {
        setIsEditMode(true);
        inputRef.current.focus();
    }
    const adjustHeight = (element) => {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    }
    const handleChange = (event) => {
        adjustHeight(event.target);
    }
    return (
        <div className='flex justify-center items-center'>
          <span className="relative"> 
            <textarea
              ref={inputRef}
              autoFocus
              value={props.value} 
              readOnly={!isEditMode} 
              onClick={turnOnEditMode}
              onBlur={() => setIsEditMode(false)}
              onChange={handleChange}
              className="w-96 max-w-96 h-auto min-h-32 max-h-72 py-2 px-4 font-roboto text-sm border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-100 transition-colors resize-none overflow-auto custom-scrollbar"
              {...props}
            />
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
        </div>
      );
}

EditableInput.propTypes = {
    value: PropTypes.string
}

export default EditableInput