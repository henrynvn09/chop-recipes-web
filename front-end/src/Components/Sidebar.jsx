import React, { useState } from 'react';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);



  const contentStyle = isOpen ? 'max-h-48 overflow-y-scroll' : 'max-h-0';

  return (
    <div className={`max-w-96`}>
      <button
        className={`text-lg font-bold mb-2 p-5 pb-0 w-full text-left flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <div className={`overflow-hidden  ml-6 transition-height duration-300 ease-in-out ${contentStyle}`}>
        {content}
      </div>
    </div>
  );
};


const Sidebar = ({ tags, ingredients }) => {
  return (
    <div className="h-screen sticky top-0 bg-gray-10  shadow-2xl">
      <AccordionItem title="Filter by Tags" content={tags} />
      <AccordionItem title="Filter by Ingredients" content={ingredients} />
    </div>
  );
};
export default Sidebar;
