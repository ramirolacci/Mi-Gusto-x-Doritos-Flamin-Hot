import React from 'react';

const Navbar: React.FC = () => {
  const logoSrc = '/Logo%20Mi%20Gusto%202025.png';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black h-16 flex items-center justify-center"
      aria-label="Barra de navegación"
    >
      <a
        href="https://www.migusto.com.ar/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir a Mi Gusto"
        className="inline-flex items-center justify-center"
      >
        <img
          src={logoSrc}
          alt="Mi Gusto"
          className="h-8 md:h-10 w-auto select-none transition-transform duration-200 ease-out hover:scale-110"
          draggable={false}
        />
      </a>
    </nav>
  );
};

export default Navbar;


