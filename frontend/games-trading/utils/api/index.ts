import axios from "axios";

export const fethUserData = async (userID: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/users/" + userID,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log('response:', response);
    const userData = response.data;
    console.log('userData:', userData);
    return userData;
  } catch (error) {
    console.error('error:', error);
  }
}

export const fetchUserOffers = async (userID: string) => {

  // Get all offers, and return the ones where user_id equals userID
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/offers",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const allOffers = response.data;
    
    // Filter offers where user_id equals userID
    const userOffers = allOffers.offers.filter((offer: { user_id: number; game_id: number }) => offer.user_id.toString() === userID.toString());

    return userOffers;
  } catch (error) {
    console.error('error:', error);
  }

}

export const fetchUserWishes = async (userID: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/wishes",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const allWishes = response.data;
    console.log('allWishes:', allWishes);
    const userWishes = allWishes.wishes.filter((wish: { user_id: number; game_id: number }) => wish.user_id.toString() === userID.toString());
    return userWishes;
  } catch (error) {
    console.error('error:', error);
  }
}

export const createGame = async (name: string, year: number, platform: string) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/games",
      {
        name: name,
        year: year,
        platform: platform
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log('response:', response);
    return response;
  } catch (error) {
    console.error('error:', error);
  }
}


export const createOffer = async (offerData: any) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/offers",
      offerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log('response:', response);
    return response;
  } catch (error) {
    console.error('error:', error);
  }
}

export const createWish = async (wishData: any) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/wishes",
      wishData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log('response:', response);
    return response;
  } catch (error) {
    console.error('error:', error);
  }
}

export const fetchGameData = async (gameID: number) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/games/" + gameID,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log('response:', response);
    const gameData = response.data;
    console.log('gameData:', gameData);
    return gameData;
  } catch (error) {
    console.error('error:', error);
  }
}

export const deleteOffer = async (offerID: number) => {
  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/offers/" + offerID,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log('response:', response);
    return response;
  } catch (error) {
    console.error('error:', error);
  }
}




