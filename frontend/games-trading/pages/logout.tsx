'use client'

import '../app/globals.css';
import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <h1 className="text-2xl my-4">¿Seguro que deseas cerrar sesión?</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <button className="btn btn-primary flex-1 md:w-full" onClick={handleLogout}>
          Cerrar sesión
        </button>
        <button className="btn btn-secondary flex-1 md:w-full" onClick={handleBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Logout;