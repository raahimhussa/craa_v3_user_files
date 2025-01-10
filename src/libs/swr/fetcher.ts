import axios from 'axios';

export const fetcher = async (url: string, params?: any) => {
  let res = undefined;
  try {
    res = await axios.get(url, { params });
    // console.log(res)
    // console.log(res.config)
    // console.log(res.request)
    // console.log(res.status)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log(error.request)
      // console.log(error.response)
    } else {
      // console.error(error);
    }
  }
  return res?.data;
};

export const fetcherWithToken = (url: string, token: string | undefined) => {
  if (!token) {
    return null; // return null immediately if token doesn't exist
  }

  return axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
    .then((res) => res.data);
};
