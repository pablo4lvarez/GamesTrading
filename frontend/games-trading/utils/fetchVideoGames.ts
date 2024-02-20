import { PLATFORMS_IDS } from "@/constants";
import axios from "axios";

export const fetchVideoGamesByName = async (name: string, platform: string) => {
  const api_key = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  let url = `https://api.rawg.io/api/games?key=${api_key}&search=${name}&search_precise=true&exclude_additions=true
  &dates=2005-01-01,2023-12-31`;

  if (platform !== '') {
    console.log('we need to update plafforms in the url');
    const platformId = PLATFORMS_IDS[platform];
    console.log('platformId:', platformId);
    const platformIdString = platformId.toString();
    url += `&platforms=${platformIdString}`;
  };

  try {
    const response = await axios.get(url);
    const videoGames = response.data.results;
    console.log('videoGames:', videoGames)
    return videoGames;
  } catch (error) {
    console.error('error:', error);
  }
};
