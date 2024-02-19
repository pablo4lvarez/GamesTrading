'use client'

import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

const UserWishes = (wishes: {wishes: [any]}) => {

  const gameWishes = wishes.wishes;
  console.log('gameWishes:', gameWishes);


  return (
    <div>
      <h1>User Wishes</h1>
    </div>
  );
}

export default UserWishes;


export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}