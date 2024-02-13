'use client'

import { getSession, useSession } from 'next-auth/react';
import '../app/globals.css'
import React, { useEffect, useState } from 'react'

const Profile = () => {

  const session = useSession();
  const userID = session.data?.user.id;

  useEffect(() => {
    console.log('userID in profile:', userID);
  });


  return (
    <div>
      <h1>Profile! </h1>
      <p>the user id is: {userID}</p>
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



