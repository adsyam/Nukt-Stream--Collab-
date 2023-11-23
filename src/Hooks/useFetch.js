import axios from "axios"

const apiKeys = [
  import.meta.env.VITE_RAPID_API_KEY_1,
  import.meta.env.VITE_RAPID_API_KEY_2,
  import.meta.env.VITE_RAPID_API_KEY_3,
  import.meta.env.VITE_RAPID_API_KEY_4,
  import.meta.env.VITE_RAPID_API_KEY_5,
  import.meta.env.VITE_RAPID_API_KEY_6,
  import.meta.env.VITE_RAPID_API_KEY_7,
  import.meta.env.VITE_RAPID_API_KEY_8,
  import.meta.env.VITE_RAPID_API_KEY_9,
  import.meta.env.VITE_RAPID_API_KEY_10,
  import.meta.env.VITE_RAPID_API_KEY_11,
  import.meta.env.VITE_RAPID_API_KEY_12,
]

let currentApiKeyIndex = 0
const BASE_URL = "https://youtube-v31.p.rapidapi.com"

const options = {
  params: {
    maxResults: "20",
  },
  headers: {
    "X-RapidAPI-Key": apiKeys[currentApiKeyIndex],
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
}

export const useFetch = async (url) => {
  let response

  for (let i = 0; i < apiKeys.length; i++) {
    options.headers["X-RapidAPI-Key"] = apiKeys[i]

    try {
      response = await axios.get(`${BASE_URL}/${url}`, options)

      if (response.status !== 429) {
        // Successful response, break out of the loop
        break
      }

    } catch (error) {
    //   console.error(`Error with API key ${apiKeys[i]}:`, error)
    }
  }

  if (!response) {
    // console.error("All API keys used. Wait for rate limit reset.")
    throw new Error("Rate limit exceeded with all API keys.")
  }

  return response.data
}