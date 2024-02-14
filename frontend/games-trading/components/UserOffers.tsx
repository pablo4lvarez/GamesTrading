'use client'

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const UserOffers = (offers: {offers: [any]}) => {

  const gameOffers = offers.offers;
  console.log('gameOffers:', gameOffers);
  console.log('offers [0]:', gameOffers[0]);


  return (
    <div>
      <h1>User Offers</h1>
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
