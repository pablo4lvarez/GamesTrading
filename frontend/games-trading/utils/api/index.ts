import axios from "axios";

const fethUserData = async (userID: string) => {
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
