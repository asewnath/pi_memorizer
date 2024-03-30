import DigitInput from "./digitInput";
import React, { useEffect, useState } from 'react';

function App() {
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    function checkScreenWidth() {
      setIsDesktopView(window.innerWidth < 1024); 
    }

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);

    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  return (
    <>
      {/* Block view on small device */}
      {isDesktopView && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#022e13] flex items-center justify-center">
          <p className="text-white text-sm p-4">Please view this content on a desktop device for the best experience.</p>
        </div>
      )}

      <section className="flex flex-col items-center justify-center">
        <DigitInput numberOfDigits={6} />
      </section>
    </>
  );
}

export default App;
