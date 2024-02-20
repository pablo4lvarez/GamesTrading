'use client'

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import '../app/globals.css'
import GameCard from "./GameCard";


interface Game {
  name: string;
  year: number;
  platform: string;
  offerID: number;
}

interface UserOffersProps {
  offerGames: Game[];
}

const UserOffers: React.FC<UserOffersProps> = ({ offerGames }) => {


  const router = useRouter();
  console.log('gameOffers in UserOffers component!:', offerGames);
  
  const handleClick = () => {
    router.push('/create-offer');
  }

  return (
    <div className="flex flex-col md:flex-row justify-between my-4 md:mx-4">
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl mb-4">
          Tus ofertas
        </h1>

        <div className="carousel carousel-center max-w-full md:max-w-sm h-60 p-4 space-x-4 bg-neutral rounded-box">
          {offerGames.map((game, index) => (
            <div key={index} className="carousel-item">
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-col justify-center">
        <button
          className="btn btn-sm md:btn-md lg:btn-lg btn-primary active:btn-primary mx-auto p-2"
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
