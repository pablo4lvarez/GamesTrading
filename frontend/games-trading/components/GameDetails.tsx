import React from 'react';

const GameDetails = ({ games }) => {
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
              <button className="btn btn-accent">Crear</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default GameDetails;





