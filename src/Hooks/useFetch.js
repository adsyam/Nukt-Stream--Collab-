//this file is the main fetch file
//we used axios as our fetching library
import axios from "axios"
// import "dotenv/config"


const apiKeys = [
  import.meta.env.VITE_RAPID_API_KEY_1,
  import.meta.env.VITE_RAPID_API_KEY_2,
  import.meta.env.VITE_RAPID_API_KEY_3,
]

let currentApiKeyIndex = 0
//this is our base url for fetching our API video data
const BASE_URL = "https://youtube-v31.p.rapidapi.com"

const options = {
  params: {
    //we fixed the get results to be 20
    //can be change depending on the needs
    maxResults: "20",
  },
  headers: {
    "X-RapidAPI-Key": apiKeys[currentApiKeyIndex],
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
}

export const useFetch = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, options)

    if (response.status === 429) {
      // Rate limit exceeded, switch to the next API key
      currentApiKeyIndex++

      if (currentApiKeyIndex < apiKeys.length) {
        options.headers["X-RapidAPI-Key"] = apiKeys[currentApiKeyIndex]
        // Retry the request with the new API key
        return useFetch(url)
      } else {
        console.error("All API keys used. Wait for rate limit reset.")
        throw new Error("Rate limit exceeded with all API keys.")
      }
    }

    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}
