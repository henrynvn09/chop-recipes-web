import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'tailwindcss/tailwind.css';

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
          className="w-1/2 min-w-96 py-2 px-4 text-sm font-semibold text-black italic font-gillsans rounded-md shadow-sm text-center resize-none overflow-hidden focus:outline-none focus:ring-0 border-2 rounded-lg border"
          maxLength={2000}
          style={{borderImage: 'linear-gradient(to right, #ff7eb6, #da49be, #7e6bff, #2ac5d6)', borderImageSlice: 1}}
          {...props}
        />
    </div>
  );
}

UserDescriptionBox.propTypes = {
  value: PropTypes.string,
};

export default UserDescriptionBox;
