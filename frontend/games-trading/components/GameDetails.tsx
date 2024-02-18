import React, { useState } from 'react';

const CreateGameDetails = ({ games }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [alert, setAlert] = useState(false);

  const handleOpenModal = () => {
    console.log('handleOpenModal...');
    document.getElementById('my_modal').showModal();
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal...');
    document.getElementById('my_modal').close();
    setAlert(false);
  }

  const handleCreate = () => {
    console.log('handleCreate...');
    const platformSelect = document.getElementById('platformSelect') as HTMLSelectElement;
    
    if (platformSelect.value === '') {
      setAlert(true);
      return;
    }

    console.log('selectedGame:', selectedGame);
    const platform = platformSelect.value;
    const gameID = selectedGame?.id;
    console.log('gameID:', gameID);
    console.log('platform:', platform);

    // TODO: create game in the DB

    // TODO: create offer in the DB using gameID and platform

    document.getElementById('my_modal').close();
  }

  const gamesToShow = games.slice(0, 15);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {gamesToShow.map((game, index) => (
          <div key={index} className="flex flex-col card card-compact w-70 bg-base-100 shadow-xl">
            <figure>
              <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded-md" />
            </figure>
            <div className="flex-grow card-body">
              <h2 className="card-title">{game.name}</h2>
              <div className="flex flex-wrap">
                {game.platforms.map((platform, index) => (
                  <div className="badge badge-neutral" key={index}>
                    {platform.platform.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-accent" onClick={() => { setSelectedGame(game); handleOpenModal(); }}>Crear</button>
            </div>
          </div>
        ))}
      </div>


      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selectedGame?.name}</h3>
          {/* Add your modal content here */}
          <div className="modal-action flex flex-col md:flex-row justify-center md:justify-between">
            <div className="w-full md:w-auto mx-auto text-center md:text-left">

              {/* Select for platforms */}
              <label className="label">Elegir plataforma</label>
              <select className="select mb-2 md:mr-2" id="platformSelect" defaultValue="">
                <option className='' value="" disabled>Plataforma</option>
                {selectedGame?.platforms.map((platform, index) => (
                  <option key={index} value={platform.platform.name}>{platform.platform.name}</option>
                ))}
              </select>

              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between py-4">
                {/* Create button */}
                <button className="btn btn-primary mb-2 md:mb-0 md:mr-2" onClick={handleCreate}>
                  Crear
                </button>

                {/* Close the modal */}
                <button className="btn" onClick={handleCloseModal}>
                  Cerrar
                </button>

              </div>

              {alert && (
                <div role="alert" className="alert alert-error"> {/* Set a fixed height */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='text-center'>Debes elegir una plataforma</span>
                </div>
              )}

            </div>

          </div>

        </div>
      </dialog>




    </div>
  );

};

export default CreateGameDetails;





