import axios from 'axios';

export async function getAllImages(message, page, perPage) {
  const baseURL = 'https://pixabay.com/api/';

  const params = {
    key: '49074776-667ebd81d42a28579e0443e2e',
    q: message,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  };
  const result = await axios.get(baseURL, { params });

  return result.data;
}
