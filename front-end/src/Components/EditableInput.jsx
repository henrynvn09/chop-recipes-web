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
        //inputRef.current.focus();
    }
    return (
        <div className='flex justify-between items-center'>
            <span className='float-start'>
                {/* text */}
                <input 
                ref = {inputRef}
                type={type} 
                autofocus
                value={props.value} 
                readOnly={!isEditMode} 
                onClick={turnOnEditMode}
                onBlur = {() => setIsEditMode(false)}
                {...props}
                />
            </span>
            {!isEditMode && (
                <ButtonIcon 
                onClick={turnOnEditMode}
                className='hover: bg-gray-200 rounded-full'
                path={mdiPencil}
                size={0.65}
                color='grey'
            />
            )
            }
            
            <button>
                {/* edit button*/}
            </button>
        </div>
    )
}

EditableInput.propTypes = {
    value: PropTypes.string
}

export default EditableInput