import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css'

function UserDescriptionBox({ value = '', ...props }) {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="flex justify-center items-center">
      <textarea
        ref={textareaRef}
        value={value}
        readOnly
        onChange={adjustHeight}
        className="w-96 max-w-96 h-auto min-h-32 max-h-72 py-2 px-4 font-roboto text-sm font-semibold text-green-500 bg-gradient-to-r from-green-400 to-green-600 rounded-md shadow-sm text-center resize-none overflow-auto"
        maxLength={2000}
        {...props}
      />
    </div>
  );
}

export default UserDescriptionBox;