export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accpet: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  console.log(endpoint, "ENDPOINT");
  let res;
  try {
    res = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
  } catch (error) {
    console.log(error, "ERROR");
  }
  // console.log(res, "RES");
  // console.log(res.status, "RES");
  if (!res?.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movie", res?.statusText);
  }
  const data = await res.json();
  return data.results;
};
