import { useEffect, useState } from 'react';

const KEY = '2f74e8e2';
function useMovies(query) {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },

    [query]
  );
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },

    [query]
  );
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },

    [query]
  );

  return [movies, isLoading];
}

export default useMovies;
