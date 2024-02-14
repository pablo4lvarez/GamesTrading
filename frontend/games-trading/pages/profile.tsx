'use client'

import { getSession, useSession } from 'next-auth/react';
import '../app/globals.css'
import React, { useEffect, useState } from 'react'
import { fethUserData } from '@/utils/api';
import { UserProfile } from '/user-profile';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Profile = () => {

  const session = useSession();
  const userID = session.data?.user.id;
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');



  const fetchUserDataFromApi = async () => {
    const data = await fethUserData(userID? userID : '');
    setUserData(data);
  }

  useEffect(() => {
    if (userID) {
      fetchUserDataFromApi();
    }
  }, [userID]);

  useEffect(() => {
    if (userData) {
      console.log('userData in profile:', userData);
      setUserEmail(userData?.email);
      setUserName(userData?.name);
      setUserPhone(userData?.phone);
      setUserLocation(userData?.location);
      setUserLastName(userData?.lastname);
    }
  }, [userData]);


  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className='flex-1 p-8 md:p-8'>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold my-4 md:my-8 text-center">
          {userName} {userLastName} 
        </h1>

        <div className='flex flex-row'>

          <div className='flex-1 flex justify-center'>
            <div>
              <h3>Datos</h3>
              <p>Nombre: {userName}</p>
              <p>Apellido: {userLastName}</p>
              <p>Email: {userEmail}</p>
              <p>Celular: {userPhone}</p>
              <p>Comuna: {userLocation}</p>
            </div>
          </div>

          <div className='flex-1 flex justify-center'>
            <div>
              <h3>Editar Datos</h3>
              <label className="input input-bordered flex items-center gap-2">
                Nombre
                <input type="text" className="grow" placeholder="Daisy" />
              </label>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  )


}

export default Profile







export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}



