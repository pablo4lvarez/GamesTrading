'use client'

import { useSession } from 'next-auth/react';
import '../app/globals.css'
import React, { use, useEffect, useState } from 'react'
import NavBar from '@/components/NavBar';
import UserOffers from '@/components/UserOffers';
import Footer from '@/components/Footer';
import { fetchUserOffers, fetchUserWishes } from "@/utils/api";
import UserWishes from '@/components/UserWishes';

const Trade = () => {
  const session = useSession();
  const userID = session.data?.user.id;

  const [offers, setOffers] = useState([]);
  const [wishes, setWishes] = useState([]);
  
  console.log('userID in exchange:', userID);

  const fetchOffers = async (userID: any) => {
    const offers = await fetchUserOffers(userID);
    console.log('offers:', offers);
    setOffers(offers);
  }

  const fetchWishes = async (userID: any) => {
    const wishes = await fetchUserWishes(userID);
    console.log('wishes:', wishes);
    setWishes(wishes);
  }

  useEffect(() => {
    const userID = session.data?.user.id;
    if (userID) {

      fetchOffers(userID);
      fetchWishes(userID);

    }
  }, [userID]);

  return (
    <div>
      <NavBar />
      <div className='min-h-screen flex flex-col md:p-8"'>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold my-4 md:my-8 text-center">
          Intercambiar juegos
        </h1>
        <UserOffers offers={offers} />
        <UserWishes wishes={wishes}/>
      </div>
      <Footer />
    </div>
  );
}

export default Trade