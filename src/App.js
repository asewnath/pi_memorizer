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

      <nav class="flex items-center justify-between flex-wrap bg-[#c76644] p-6 mb-10">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">pi memorizer</span>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4">
              about
            </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black">
              help
            </a>
          </div>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center">
        <DigitInput numberOfDigits={6} />
      </section>
    </>
  );
}

export default App;
