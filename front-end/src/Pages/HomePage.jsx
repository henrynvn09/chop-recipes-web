// import React from "react";
// import '../Styles/global.css'


import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
//import { animated } from 'react-spring';
import  '../Styles/SwipingComponent.css' //import the css file for styling

function HomePage() {
  const SwipingComponent = () => {
    //x is storing where the card is
    //position is storing where the mouse is
    const [isDragging, setDragging] = React.useState(false);
    const [position, setPosition] = React.useState(0);
    const [{ x }, set] = useSpring(() => ({ x: 50 }));

    const handleMouseDown = () => {
      setDragging(true);
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition(e.clientX);
        set({ x: e.clientX / window.innerWidth * 100 });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      const swipePercent = position / window.innerWidth * 100;
      // Determine swipe direction based on final position
      if (swipePercent < 25 ) {
        // Swiped left
        set({ x: -500 }); // Move component to the left off screen
      } else if (swipePercent > 75) {
        // Swiped right
        set({ x: 500 }); // Move component to the right off screen
      } else {
        // Reset to initial position
        set({ x: 50 });
      }
    };

    return (
      <div
        className="swipe-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <animated.div
          className="swipe-item"
          style={{
            //treat x as a percentage of the window (note we can't use CSS's % because that would be a percentage of the card, not the window)
            transform: x.interpolate((x) => `translateX(calc(${x / 100 * window.innerWidth}px - 50%))`),
          }}
        >
          Swipe Me
        </animated.div>
      </div>
    );
  };

  return (
    <div>
      <SwipingComponent />
    </div>
  );
}

export default HomePage;
