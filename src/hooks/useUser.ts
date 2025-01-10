import { getCookie } from 'cookies-next';
import { fetcherWithToken } from 'src/libs/swr/fetcher';
import useSWR from 'swr';
function useUser(key = 'v1/auth/token') {
  const token = getCookie('accessToken');
  return useSWR([key, token], fetcherWithToken);

  // if (token) {
  //   return useSWR([key, token], fetcherWithToken);
  // } else {
  //   return {
  //     data: null,
  //     error: null,
  //     mutate: async () => {},
  //     isValidating: false,
  //   };
  // }  
}
export default useUser;
