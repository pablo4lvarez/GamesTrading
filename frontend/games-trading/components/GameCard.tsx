'use client'

import React, { useState } from "react";
import '../app/globals.css'
import { deleteOffer } from "@/utils/api";
import { useRouter } from 'next/router';

const GameCard = (gameData: any) => {
  const { name, year, platform, offerID } = gameData;
  const router = useRouter();
  console.log('offer id in GameCard:', offerID);
  const modalId = `my_modal_${offerID}`; // Unique id for each modal

  const handleDelete = async () => {

    //TODO: delete offer from backend. Need the offerID.
    const response = await deleteOffer(offerID);
    console.log('response:', response);
    if (response?.status === 200) {
      console.log('Offer deleted successfully');
      handleCloseModal();
      router.reload();
    } else {
      console.log('Error deleting offer');
      // Set Toast MSg
    };

  };

  const handleOpenModal = () => {
    document.getElementById(modalId).showModal();
  };

  const handleCloseModal = () => {
    document.getElementById(modalId).close();
  }


  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <div className="card-body flex flex-col h-full">
        <div className="h-1/2">
          <h2 className="card-title">{name} ({year})</h2>
          <span className='badge badge-secondary'>{platform}</span>
        </div>
        <div className="flex items-end h-1/2 justify-end">
          <button className="btn btn-outline btn-error text-xs" onClick={handleOpenModal}>Eliminar</button>
        </div>
      </div>


      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿Seguro que quieres eliminarlo?</h3>
          <p className="py-4">Estabas ofreciendo {name} para {platform}.</p>
          <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>Cerrar</button>
              <button className="btn btn-error" onClick={handleDelete}>Eliminar</button>
          </div>
        </div>
      </dialog>

    </div>


  );
}

export default GameCard;






