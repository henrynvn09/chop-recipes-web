import React from 'react'
import css from '../Styles/EditableInput.module.scss'
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css'
import { mdiPencil } from '@mdi/js'
import ButtonIcon from './ButtonIcon'

function EditableInput(props) {
    const [isEditMode, setIsEditMode] = React.useState(false)
    function turnOnEditMode() {
        setIsEditMode(true);
    }
    return (
        <div className='flex justify-between items-center'>
            <span className=''>
                {/* text */}
                <input type="text" 
                value={props.value} 
                readOnly={!isEditMode} 
                    onClick={turnOnEditMode}
                />
            </span>
            <ButtonIcon 
                className='hover: bg-gray-200 rounded-full'
                path={mdiPencil}
                size={0.65}
                color='grey'
            />
            
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