import axios from "axios"


const apiKeys = [
  import.meta.env.VITE_RAPID_API_KEY_1,
  import.meta.env.VITE_RAPID_API_KEY_2,
  import.meta.env.VITE_RAPID_API_KEY_3,
  import.meta.env.VITE_RAPID_API_KEY_4,
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
