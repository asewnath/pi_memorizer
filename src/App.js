import TestPi from "./components/testPi";
import LearnPi from "./components/learnPi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <p className="text-white text-sm p-4">Please view this content on a desktop device for the best experience. If you're on a desktop device, increase the screen size.</p>
        </div>
      )}

      <nav class="flex items-center justify-between flex-wrap bg-[#c76644] p-6 mb-10">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">π memorizer</span>
        </div>
      </nav>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPi />} />
          <Route path="learnPi" element={<LearnPi />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
