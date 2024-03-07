import React from 'react'
//import css from '../Styles/EditableInput.module.scss'
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css'
import { mdiAccountBadge } from '@mdi/js'
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
            <ButtonIcon path={mdiAccountBadge} />
            
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