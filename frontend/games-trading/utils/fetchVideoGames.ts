import axios from "axios";

export const fetchVideoGamesByName = async (name: string) => {
  const api_key = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${api_key}&search=${name}&search_precise=true&exclude_additions=true
  &dates=2005-01-01,2022-12-31`;
  
  try {
    const response = await axios.get(url);
    const videoGames = response.data.results;
    console.log('videoGames:', videoGames)
    return videoGames;
  } catch (error) {
    console.error('error:', error);
  }
};

export const fetchVideoGamesById = async () => {
  console.log('fetchVideoGamesById');
}