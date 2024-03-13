import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };
  
  return (
    <>
      <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div class="relative">
                    <div class="absolute">
                        <div class="">
                            <h1 class="my-2 text-gray-800 font-bold text-2xl">
                                Whoops-a-daisy! Looks like you slipped
                                into the wrong isle
                            </h1>
                            <p class="my-2 text-gray-800"> Don't worry, we're busy sweeping up the mess and rustling up some fresh recipes. While we tidy things up, why not peel away and explore some of our other delicious offerings? Stay tuned for more culinary delights! </p>
                            <button onClick={handleButtonClick} class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me back!</button>                        
                            </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                    </div>
                </div>
            </div>
            <div>
                <img src="https://cdn.dribbble.com/users/427368/screenshots/12380209/media/bc3e36697e73a40f528d463fcb8d47c9.jpg?resize=800x600&vertical=center" />
            </div>
        </div>
    </>
  );
};

export default Error404;