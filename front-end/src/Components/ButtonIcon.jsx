import React from 'react'
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css';
import Icon from '@mdi/react'

function ButtonIcon({children, path, size=1, color='grey', ... props}) {
    return (
        <div 
            className='cursor-pointer hover:bg-gray-100 p-1 rounded-full w-min'
            {...props}
        >
            <Icon 
                path={path}
                size={size}
                color={color}
            />
        </div>
    )
}

ButtonIcon.propTypes = {
    path: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
}

export default ButtonIcon