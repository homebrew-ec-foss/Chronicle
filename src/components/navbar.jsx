import React, { useState } from 'react';
import '../styles.css';

const Navbar = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount === 2) {
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowEasterEgg(false);
      }, 3000);
      setClickCount(0);
    }
  };

  return (
    <div className="relative">
      <div className="duration-2000 flex h-12 w-auto items-center rounded-3xl bg-[#6b40af] px-4 shadow-md transition-all hover:bg-[#7351a9]">
        <a href="#" className="cursor-pointer font-black text-white" onClick={handleClick}>
          Chronicle
        </a>
      </div>
      {showEasterEgg && (
        <div className="absolute left-1/2 top-16 -translate-x-1/2 transform rounded bg-white p-4 shadow-md">
          <p className="text-gray-800">You found the secret message! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
