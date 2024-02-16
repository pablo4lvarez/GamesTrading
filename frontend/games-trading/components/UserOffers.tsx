'use client'

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import '../app/globals.css'

const UserOffers = (offers: {offers: [any]}) => {

  const gameOffers = offers.offers;
  const router = useRouter();
  console.log('gameOffers:', gameOffers);
  
  const handleClick = () => {
    router.push('/create-offer');
  }


  return (
    <div className="h-1/3 flex flex-row justify-between my-4">
      <div className="w-1/2 mx-4 flex flex-col items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl">
          Tus ofertas
        </h1>
        <div className="carousel carousel-center max-w-xs h-48 p-4 space-x-4 bg-neutral rounded-box">
          <div className="carousel-item">
            <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
          </div>
        </div>

      </div>
      <div className="w-1/2 mx-4 flex flex-col justify-center">
        <button 
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary active:btn-primary mx-auto p-2"
          onClick={handleClick}
        >
          Crear Oferta
        </button>
      </div>
    </div>
  );
}

export default UserOffers;


export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
