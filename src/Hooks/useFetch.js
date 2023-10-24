//this file is the main fetch file
//we used axios as our fetching library
import axios from "axios";

//this is our base url for fetching our API video data
const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    //we fixed the get results to be 20
    //can be change depending on the needs
    maxResults: "20",
  },
  headers: {
    "X-RapidAPI-Key": "e05035a5a5msheb07c768f5e3a59p16a60fjsncdc9b291ae84",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const useFetch = async (url) => {
  try {
    // make the actual API request using axios
    const response = await axios.get(`${BASE_URL}/${url}`, options); // axios will get the api data with our BASE_URL plus the additional URL query and options
    return response.data; // return the data
  } catch (error) {
    // handle errors as needed
    console.error("Error fetching data:", error);
    throw error;
  }
};
