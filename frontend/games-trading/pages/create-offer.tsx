'use client'

import React, { use, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const CreateOffer = () => {

  useEffect(() => {
    const api_key = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    console.log('api_key:', api_key);
  });

  return (
    <div>
      <h1>Create Offer</h1>
    </div>
  );
}

export default CreateOffer;