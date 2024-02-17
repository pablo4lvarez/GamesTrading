'use client'

import '../app/globals.css'
import React, { use, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { fetchVideoGamesByName } from '@/utils/fetchVideoGames';
import GameDetails from '@/components/GameDetails';

const CreateOffer = () => {

  const [nameSearch, setNameSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handlePlatformChange = (e: any) => {
    setSelectedPlatform(e.target.value);
  };

  const handleNameSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNameSearch(event.target.value);
  };
  

  const handleClick = async ()  => {
    console.log('handleClick');
    console.log('nameSearch:', nameSearch);
    // fetchVideoGamesByName(nameSearch);
    console.log('selectedPlatform:', selectedPlatform);

    const data = await fetchVideoGamesByName(nameSearch, selectedPlatform);
    

    setLoading(true);
    // Simulate API call or fetch data here
    setTimeout(() => {
      setLoading(false);

      if (data) {
        // Update games state with fetched data
        setSearchResults(data);
      }
    }, 2000); // Simulating a 2-second delay for demonstration purposes
    
  }

  useEffect(() => {
    console.log('searchResults:', searchResults);
    console.log(typeof searchResults);
    console.log('searchResults.length:', searchResults.length);

  }, [searchResults]);



  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />

      <div className='flex-1 p-4 md:p-8'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center'>
          Crear una oferta
        </h1>

        <div className='flex flex-row justify-center space-x-8 my-4 md:my-8'>
          <input
            type='text'
            placeholder='Nombre del juego'
            className='input input-bordered input-primary w-full max-w-xs'
            value={nameSearch}
            onChange={handleNameSearchChange}
          />
          <select className="select select-primary w-1/4 max-w-fill mx-20"
          value={selectedPlatform}
          onChange={handlePlatformChange}
          >
            <option disabled value="">Plataforma</option>
            <option value="">Todas</option>
            <option value="PlayStation 4">PS4</option>
            <option value="PlayStation 5">PS5</option>
            <option value="PlayStation 3">PS3</option>
            <option value="Nintendo Wii">Nintendo Wii</option>
            <option value="Nintendo 3DS">Nintendo 3DS</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox Series X">Xbox Series X</option>
          </select>
          <button className='btn btn-primary' onClick={handleClick}>Buscar</button>
        </div>

        {loading && (
          <div className="flex items-center justify-center my-40">
            <span className="loading loading-spinner text-accent text-4xl"></span>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <GameDetails games={searchResults} />
        )}

      </div>

      <Footer />
    </div>
  );
};


export default CreateOffer;
