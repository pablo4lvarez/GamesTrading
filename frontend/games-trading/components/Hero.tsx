'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { NextRouter } from 'next/router';

interface HeroProps {
  router: NextRouter;
}

const Hero: React.FC<HeroProps> = ({ router }) => {

  const session = useSession();
  const [btnText, setBtnText] = useState('Registrarse');

  const handleBtnAction = () => {
    if (session.data) {
      // Redirect to Exchange

    } else if (!session.data) {
      // Redirect to register
      router.push('/register');
    }
  };

  useEffect(() => {
    console.log('session:', session);
    if (session.data) {
      console.log('session.data:', session.data);
      setBtnText('Comenzar');
    }
  });

  return (
    <div className="hero md:h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-full px-6 md:px-12 lg:px-24 xl:px-32">
          <img
            src="github-mark.svg" // Replace with the path to your image
            alt="Your Image Alt Text"
            className="mx-auto max-w-full h-auto"
          />
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold py-2 md:py-6">Games Trading</h1>
          <p className="py-4 md:py-6 text-lg md:text-2xl">Descubre tu nueva plataforma para intercambiar juegos físicos. ¡Encuentra o crea rápidamente ofertas y ponte en contacto!</p>
          <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg my-4 md:my-6" onClick={handleBtnAction}>{btnText}</button>
          {/* También crear opción de comienza comenzar! */}
        </div>
      </div>
    </div>
  )
}

export default Hero