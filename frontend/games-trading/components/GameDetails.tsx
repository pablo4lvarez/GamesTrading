// GameDetails.js
import React from 'react';

const GameDetails = ({ games }) => {

  // Limit the number of games to display
  const gamesToShow = games.slice(0, 10);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {gamesToShow.map((game, index) => (
        <div key={index} className="max-w-md mx-auto mb-8 p-4 border border-gray-300 rounded-md">
          <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded-md mb-4" />
          <h2 className="text-xl font-bold mb-2">{game.name}</h2>
          <div className="flex flex-wrap">
            {game.platforms.map((platform, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-md mr-2 mb-2">
                {platform.platform.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameDetails;