import axios from "axios";

const API_KEY = "55388075-5b2240cf69458d8e2371e7c79";

export async function fetchImages(query) {
  const url = "https://pixabay.com/api/";

  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });

  return response.data;
}
