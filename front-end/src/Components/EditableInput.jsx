import React from 'react'
//import css from '../Styles/EditableInput.module.scss'
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css'
import { mdiPencil } from '@mdi/js'
import ButtonIcon from './ButtonIcon'

function EditableInput({value, type = '', ...props}) {
    const [isEditMode, setIsEditMode] = React.useState(false)
    const inputRef = React.useRef(null)
    function turnOnEditMode() {
        setIsEditMode(true);
        inputRef.current.focus();
    }
    return (
        <div className='flex justify-center items-center'>
          <span className="relative"> 
            <input 
              ref={inputRef}
              type={type} 
              autoFocus
              value={props.value} 
              readOnly={!isEditMode} 
              onClick={turnOnEditMode}
              onBlur={() => setIsEditMode(false)}
              className="w-1/2 py-2 px-4 font-roboto text-lg border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-100 transition-colors"
              {...props}
            />
            {!isEditMode && (
              <ButtonIcon 
                onClick={turnOnEditMode}
                className='hover:bg-gray-200 rounded-full absolute right-8 top-1/2 transform -translate-y-1/2'
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